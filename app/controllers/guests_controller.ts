import type { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'
import FamilyInvitation from '#models/family_invitation'
import FamilyInvitationGuest from '#models/family_invitation_guest'
import InvitationKey from '#models/invitation_key'
import shortuuid from 'short-uuid'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import { isNullOrUndefined } from 'node:util'

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
          tableNumber: schema.string.optional({ trim: true }),
        })
      ),
    })

    let payload
    try {
      payload = await request.validate({ schema: guestSchema })
    } catch (error) {
      console.log('Error processing bbb: ', error)
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
            tableNumber: guest.tableNumber,
          })),
          { client: trx }
        )
      })

      return response.status(201).send({ message: 'Family and guests created successfully' })
    } catch (error) {
      console.log('Error processing creating guest: ', error)
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
      console.log('Error processing updating guest: ', error)
      return response.status(422).send({ error: error.messages })
    }

    const family = await FamilyInvitation.query().where('id', payload.id).preload('guests').first()
    if (!family) {
      return response.status(404).send({ error: 'Family not found.' })
    }

    try {
      await db.transaction(async (trx) => {
        // Update family info
        await family
          .merge({
            familyName: payload.familyName,
            maxGuests: payload.maxGuests,
            isAttending: isNullOrUndefined(payload.isAttending)
              ? null
              : payload.isAttending
                ? 1
                : 0,
            noOfGuestsAttending: payload.isAttending ? payload.noOfGuestsAttending : 0,
          })
          .useTransaction(trx)
          .save()

        // Get IDs of guests in the payload
        const payloadGuestIds = payload.guests
          .map((guest) => guest.id)
          .filter((id) => id !== undefined)

        // Delete guests that are in the DB but not in the payload
        await family
          .related('guests')
          .query()
          .useTransaction(trx)
          .whereNotIn('id', payloadGuestIds.length ? payloadGuestIds : [0]) // [0] prevents SQL error if empty
          .delete()

        // Upsert guests
        for (const guest of payload.guests) {
          if (guest.id) {
            // Update existing guest
            await family
              .related('guests')
              .query()
              .useTransaction(trx)
              .where('id', guest.id)
              .update({
                name: guest.name,
                tableNumber: guest.tableNumber,
              })
          } else {
            // Create new guest
            await family.related('guests').create(
              {
                name: guest.name,
                tableNumber: guest.tableNumber,
              },
              { client: trx }
            )
          }
        }
      })

      return response.status(200).send({ message: 'Family and guests updated successfully!' })
    } catch (error) {
      console.log('Error processing updating guest: ', error)
      return response.status(500).send({ error: 'Failed to update family and guests.' })
    }
  }

  async deleteGuest({ request, response }: HttpContext) {
    const { id } = request.only(['id'])

    const family = await FamilyInvitation.query().where('id', id).preload('guests').first()
    if (!family) {
      return response.status(404).send({ error: 'Family not found' })
    }

    try {
      // Start a transaction
      await db.transaction(async (trx) => {
        // Delete invitation keys related to guests
        await InvitationKey.query()
          .where('familyInvitationId', family.id)
          .useTransaction(trx)
          .delete()

        // Delete related guests
        await FamilyInvitationGuest.query()
          .where('familyInvitationId', family.id)
          .useTransaction(trx)
          .delete()

        // Delete the family
        await family.useTransaction(trx).delete()
      })

      return response.status(200).send({ message: 'Family and related data deleted successfully!' })
    } catch (error) {
      console.log('Error processing deleting guest: ', error)
      return response.status(500).send({ error: 'Failed to delete family.' })
    }
  }

  async generateInviteKey({ params, response }: HttpContext) {
    const family = await FamilyInvitation.query().where('id', params.id).first()

    if (!family) {
      return response.status(404).send({ error: 'Family not found.' })
    }

    try {
      // Check if a valid invite key already exists
      const existingKey = await InvitationKey.query()
        .where('familyInvitationId', family.id)
        .andWhere('validUntil', '>', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
        .first()

      if (existingKey) {
        // Return the existing valid key
        return response.status(200).send({
          code: existingKey.code,
          inviteLink: `${process.env.APP_URL}/rsvp?key=${existingKey.code}`,
        })
      }

      // Generate a new invitation key if no valid key exists
      const newKey = await db.transaction(async (trx) => {
        // Invalidate any expired keys
        await InvitationKey.query()
          .where('familyInvitationId', family.id)
          .useTransaction(trx)
          .update({ validUntil: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') })

        // Create a new key
        return await InvitationKey.create(
          {
            code: shortuuid.generate(), // Generate a unique key
            familyInvitationId: family.id, // Associate the key with the family
            validUntil: DateTime.now().plus({ days: 35 }), // Set expiration date
          },
          { client: trx }
        )
      })

      return response.status(201).send({
        code: newKey.code,
        inviteLink: `${process.env.APP_URL}/rsvp?key=${newKey.code}`,
      })
    } catch (error) {
      console.log('Error processing generating invitation: ', error)
      return response.status(500).send({ error: 'Failed to generate invite key.' })
    }
  }

  async generateAllInviteKeys({ response }: HttpContext) {
    try {
      const families = await FamilyInvitation.query()

      const qrCodes = await db.transaction(async (trx) => {
        const results = []

        for (const family of families) {
          // Check if a valid invite key exists
          const existingKey = await InvitationKey.query()
            .where('familyInvitationId', family.id)
            .andWhere('validUntil', '>', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
            .first()

          if (existingKey) {
            results.push({
              familyId: family.id,
              familyName: family.familyName,
              inviteKey: existingKey.code,
            })
          } else {
            // Generate a new invite key
            const newKey = await InvitationKey.create(
              {
                code: shortuuid.generate(),
                familyInvitationId: family.id,
                validUntil: DateTime.now().plus({ days: 33 }),
              },
              { client: trx }
            )

            results.push({
              familyId: family.id,
              familyName: family.familyName,
              inviteKey: newKey.code,
            })
          }
        }

        return results
      })

      return response.status(200).send(qrCodes)
    } catch (error) {
      console.log('Error processing generating all invitations: ', error)
      return response.status(500).send({ error: 'Failed to generate invite keys.' })
    }
  }
}
