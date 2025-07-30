import type { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'
import FamilyInvitation from '#models/family_invitation'
import InvitationKey from '#models/invitation_key'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class GuestsController {
  async getGuestList({ response }: HttpContext) {
    const families = await FamilyInvitation.query()
      .preload('guests')
      .select('id', 'familyName', 'isAttending', 'noOfGuestsAttending', 'maxGuests')
    return response.status(200).send(families)
  }

  async getGuestById({ params, response }: HttpContext) {
    const guest = await FamilyInvitation.query()
      .select('id', 'guestNames', 'isAttending', 'noOfGuestsAttending', 'maxGuests')
      .where('id', params.id)
      .first()

    if (!guest) {
      return response.status(404).send({ error: 'Guest not found' })
    }

    return response.status(200).send(guest)
  }

  async createGuest({ request, response }: HttpContext) {
    const guestSchema = schema.create({
      familyName: schema.string({ trim: true }, [rules.maxLength(255)]),
      maxGuests: schema.number([rules.unsigned(), rules.range(1, 20)]),
      guests: schema.array().members(
        schema.object().members({
          name: schema.string({ trim: true }, [rules.maxLength(255)]),
          tableNumber: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
        })
      ),
    })

    let payload
    try {
      payload = await request.validate({ schema: guestSchema })
    } catch (error) {
      return response.status(422).send({ error: error.messages })
    }

    try {
      await db.transaction(async (trx) => {
        const family = await FamilyInvitation.create(
          {
            familyName: payload.familyName,
            maxGuests: payload.maxGuests,
          },
          { client: trx }
        )

        await family.related('guests').createMany(
          payload.guests.map((guest) => ({
            ...guest,
            tableNumber: guest.tableNumber ? Number(guest.tableNumber) : undefined,
          })),
          { client: trx }
        )
      })

      return response.status(201).send({ message: 'Family and guests created successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Failed to create family and guests' })
    }
  }

  async updateGuest({ request, response }: HttpContext) {
    const guestSchema = schema.create({
      id: schema.number(),
      familyName: schema.string({ trim: true }, [rules.maxLength(255)]),
      maxGuests: schema.number([rules.unsigned(), rules.range(1, 20)]),
      isAttending: schema.boolean.optional(),
      noOfGuestsAttending: schema.number([rules.unsigned()]),
      guests: schema.array().members(
        schema.object().members({
          id: schema.number.optional(),
          name: schema.string({ trim: true }, [rules.maxLength(255)]),
          tableNumber: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
        })
      ),
    })

    let payload
    try {
      payload = await request.validate({ schema: guestSchema })
    } catch (error) {
      return response.status(422).send({ error: error.messages })
    }

    const family = await FamilyInvitation.query().where('id', payload.id).first()
    if (!family) {
      return response.status(404).send({ error: 'Family not found' })
    }

    try {
      await db.transaction(async (trx) => {
        await family
          .merge({
            familyName: payload.familyName,
            maxGuests: payload.maxGuests,
            isAttending: Number(payload.isAttending),
            noOfGuestsAttending: payload.isAttending ? payload.noOfGuestsAttending : 0,
          })
          .useTransaction(trx)
          .save()

        const existingGuestIds = payload.guests
          .map((guest) => guest.id)
          .filter((id) => id !== undefined)

        await family
          .related('guests')
          .query()
          .useTransaction(trx)
          .whereNotIn('id', existingGuestIds)
          .delete()

        for (const guest of payload.guests) {
          if (guest.id) {
            await family
              .related('guests')
              .query()
              .useTransaction(trx)
              .where('id', guest.id)
              .update({
                name: guest.name,
                tableNumber: guest.tableNumber ? Number(guest.tableNumber) : undefined,
              })
          } else {
            await family.related('guests').create(
              {
                name: guest.name,
                tableNumber: guest.tableNumber ? Number(guest.tableNumber) : undefined,
              },
              { client: trx }
            )
          }
        }
      })

      return response.status(200).send({ message: 'Family and guests updated successfully' })
    } catch (error) {
      console.error('Error updating family and guests:', error)
      return response.status(500).send({ error: 'Failed to update family and guests' })
    }
  }

  async deleteGuest({ request, response }: HttpContext) {
    const { id } = request.only(['id'])

    const family = await FamilyInvitation.query().where('id', id).first()
    if (!family) {
      return response.status(404).send({ error: 'Family not found' })
    }

    try {
      await db.transaction(async (trx: any) => {
        await family.related('guests').query().useTransaction(trx).delete()
        await trx
          .from('invitation_keys')
          .where('family_invitation_id', id)
          .delete()
        await family.useTransaction(trx).delete()
      })

      return response.status(200).send({ message: 'Family and related data deleted successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Failed to delete family' })
    }
  }

  async generateInviteKey({ params, response }: HttpContext) {
    const family = await FamilyInvitation.query().where('id', params.id).first()

    if (!family) {
      return response.status(404).send({ error: 'Family not found' })
    }

    try {
      await db.transaction(async (trx) => {
        await InvitationKey.query()
          .where('familyInvitationId', family.id)
          .useTransaction(trx)
          .update({ validUntil: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') })

        const newKey = await InvitationKey.create(
          {
            code: uuidv4(),
            familyInvitationId: family.id,
            validUntil: DateTime.now().plus({ days: 30 }),
          },
          { client: trx }
        )

        return response.status(201).send(newKey)
      })
    } catch (error) {
      return response.status(500).send({ error: 'Failed to generate invite key' })
    }
  }

  async generateAllInviteKeys({ response }: HttpContext) {
    try {
      const families = await FamilyInvitation.query().preload('guests')

      await db.transaction(async (trx) => {
        for (const family of families) {
          const existingKey = await InvitationKey.query()
            .where('familyInvitationId', family.id)
            .where('validUntil', '>', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
            .first()

          if (!existingKey) {
            await InvitationKey.create(
              {
                code: uuidv4(),
                familyInvitationId: family.id,
                validUntil: DateTime.now().plus({ days: 30 }),
              },
              { client: trx }
            )
          }
        }
      })

      return response.status(200).send({ message: 'All invitation keys generated or updated successfully' })
    } catch (error) {
      return response.status(500).send({ error: 'Failed to generate all invitation keys' })
    }
  }
}