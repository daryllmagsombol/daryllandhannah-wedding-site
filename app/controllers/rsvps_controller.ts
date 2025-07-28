import InvitationGuest from '#models/family_invitation'
import InvitationKey from '#models/invitation_key'
import type { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'
import db from '@adonisjs/lucid/services/db'

export default class RsvpsController {
  async getGuestInvitation({ request, response }: HttpContext) {
    const key = request.input('key')

    console.log('Key:', key)

    if (!key) {
      return response.status(400).send('Key is required')
    }

    const guest = await InvitationGuest.query()
      .select(
        'id',
        'familyName', // Include familyName in the response
        'isAttending',
        'noOfGuestsAttending',
        'maxGuests'
      )
      .where('id', InvitationKey.query().select('familyInvitationId').where('code', key).limit(1))
      .first()

    console.log('Guest:', guest)

    if (!guest) {
      return response.status(404).send('Guest not found')
    }

    return response.status(200).send(guest)
  }

  async saveGuestInvitation({ request, response }: HttpContext) {
    // Validation schema
    const rsvpSchema = schema.create({
      id: schema.number(),
      isAttending: schema.boolean(),
      noOfGuestsAttending: schema.number([rules.unsigned()]),
      code: schema.string(),
    })

    let payload
    try {
      payload = await request.validate({ schema: rsvpSchema })
    } catch (error) {
      return response.status(422).send({ error: error.messages })
    }

    const { id, isAttending, noOfGuestsAttending, code } = payload

    // Start a transaction
    const trx = await db.transaction()

    try {
      // Check key validity
      const keyCheck: { error?: string; success?: boolean } = await this.checkKey(code, id)
      if (keyCheck.error && !keyCheck.success) {
        await trx.rollback()
        return response.status(400).send({ error: keyCheck.error })
      }

      const guest = await InvitationGuest.query({ client: trx }).where('id', id).first()
      if (!guest) {
        await trx.rollback()
        return response.status(404).send({ error: 'Guest not found' })
      }

      if (noOfGuestsAttending > guest.maxGuests) {
        await trx.rollback()
        return response
          .status(400)
          .send({ error: `You can only invite ${guest.maxGuests} guest(s)` })
      }

      await InvitationGuest.query({ client: trx })
        .where('id', id)
        .update({ isAttending, noOfGuestsAttending })

      await trx.commit()

      return response.status(200).send('Guest invitation updated successfully')
    } catch (error) {
      await trx.rollback()
      return response.status(500).send({ error: 'Internal Server Error' })
    }
  }

  async checkKey(key: string, id: number | string) {
    if (!key || !id) {
      return { error: 'Key is required' }
    }

    try {
      const invitationKey = await InvitationKey.query()
        .where('code', key)
        .where('family_invitation_id', id)
        .first()

      if (!invitationKey) {
        return { error: 'Key not found.' }
      }
      if (new Date(invitationKey.validUntil.toJSDate()) < new Date()) {
        return { error: 'Key expired. Request another RSVP access to us.' }
      }
      return { success: true }
    } catch {
      return { error: 'Internal Server Error' }
    }
  }
}
