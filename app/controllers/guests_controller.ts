import type { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'
import InvitationGuest from '#models/invitation_guest'
import InvitationKey from '#models/invitation_key'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class GuestsController {
  async getGuestList({ response }: HttpContext) {
    const guests = await InvitationGuest.query().select(
      'id',
      'guestNames',
      'isAttending',
      'noOfGuestsAttending',
      'maxGuests'
    )
    return response.status(200).send(guests)
  }

  async getGuestById({ params, response }: HttpContext) {
    const guest = await InvitationGuest.query()
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
      guestNames: schema.string({ trim: true }, [rules.maxLength(255)]),
      isAttending: schema.boolean.optional(),
      noOfGuestsAttending: schema.number([rules.unsigned()]),
      maxGuests: schema.number([rules.unsigned(), rules.range(1, 20)]),
    })

    let payload
    try {
      payload = await request.validate({ schema: guestSchema })
    } catch (error) {
      return response.status(422).send({ error: error.messages })
    }

    const newGuest = await InvitationGuest.create({
      ...payload,
      isAttending:
        typeof payload.isAttending === 'boolean' ? (payload.isAttending ? 1 : 0) : undefined,
    })
    return response.status(201).send(newGuest)
  }

  async updateGuest({ request, response }: HttpContext) {
    const guestSchema = schema.create({
      id: schema.number(),
      guestNames: schema.string({ trim: true }, [rules.maxLength(255)]),
      isAttending: schema.boolean.optional(),
      noOfGuestsAttending: schema.number([rules.unsigned()]),
      maxGuests: schema.number([rules.unsigned(), rules.range(1, 20)]),
    })

    let payload
    try {
      payload = await request.validate({ schema: guestSchema })
    } catch (error) {
      return response.status(422).send({ error: error.messages })
    }
    const guest = await InvitationGuest.query().where('id', payload.id).first()
    if (!guest) {
      return response.status(404).send({ error: 'Guest not found' })
    }

    await guest
      .merge({
        ...payload,
        isAttending:
          typeof payload.isAttending === 'boolean' ? (payload.isAttending ? 1 : 0) : undefined,
      })
      .save()
    return response.status(200).send(guest)
  }

  async deleteGuest({ request, response }: HttpContext) {
    const guestSchema = schema.create({
      id: schema.number(),
    })

    let payload
    try {
      payload = await request.validate({ schema: guestSchema })
    } catch (error) {
      return response.status(422).send({ error: error.messages })
    }

    const guest = await InvitationGuest.query().where('id', payload.id).first()
    if (!guest) {
      return response.status(404).send({ error: 'Guest not found' })
    }

    // Start a transaction
    const trx = await db.transaction()

    try {
      // Delete all keys associated with the guest
      await InvitationKey.query({ client: trx }).where('invitationGuestId', payload.id).delete()

      // Delete the guest
      await guest.useTransaction(trx).delete()

      // Commit the transaction
      await trx.commit()

      return response
        .status(200)
        .send({ message: 'Guest and associated keys deleted successfully' })
    } catch (error) {
      // Rollback the transaction in case of an error
      await trx.rollback()
      return response.status(500).send({ error: 'Failed to delete guest and associated keys' })
    }
  }

  async generateInviteKey({ params, response }: HttpContext) {
    const guest = await InvitationGuest.query().where('id', params.id).first()

    if (!guest) {
      return response.status(404).send({ error: 'Guest not found' })
    }

    // Invalidate existing keys for the guest
    await InvitationKey.query()
      .where('invitationGuestId', guest.id)
      .update({ validUntil: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') }) // Convert to database-compatible format

    // Generate a new invite key
    const newKey = await InvitationKey.create({
      code: uuidv4(), // Generate a unique key
      invitationGuestId: guest.id,
      validUntil: DateTime.now().plus({ days: 30 }), // Store as DateTime object
    })

    return response.status(201).send(newKey)
  }
}
