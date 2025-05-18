import InvitationGuest from '#models/invitation_guest'
import InvitationKey from '#models/invitation_key'
import type { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'

export default class RsvpsController {
  async getGuestInvitation({ request, response }: HttpContext) {
    const key = request.input('key')

    if (!key) {
      return response.status(400).send('Key is required')
    }

    const guest = await InvitationGuest.query()
      .select('id', 'guestNames', 'isAttending', 'noOfGuestsAttending', 'maxGuests')
      .where('id', InvitationKey.query().select('invitation_guest_id').where('code', key).limit(1))
      .first()

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

    // Check key validity
    const keyCheck: { error?: string; success?: boolean } = await this.checkKey(code, id)
    if (keyCheck.error && !keyCheck.success) {
      return response.status(400).send({ error: keyCheck.error })
    }

    const guest = await InvitationGuest.query().where('id', id).first()
    if (!guest) {
      return response.status(404).send({ error: 'Guest not found' })
    }

    if (noOfGuestsAttending > guest.maxGuests) {
      return response.status(400).send({ error: `You can only invite ${guest.maxGuests} guest(s)` })
    }

    try {
      await InvitationGuest.query().where('id', id).update({ isAttending, noOfGuestsAttending })
      if (isAttending) {
        return response.status(200).send('Guest invitation updated successfully')
      }
      return response.status(200).send('Guest invitation updated successfully')
    } catch {
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
        .where('invitation_guest_id', id)
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
