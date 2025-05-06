import InvitationGuest from '#models/invitation_guest'
import InvitationKey from '#models/invitation_key'
import type { HttpContext } from '@adonisjs/core/http'

export default class RsvpsController {
  getGuestInvitation({ request, response }: HttpContext) {
    const searchParams = request.qs()
    const key = searchParams.key

    if (!key) {
      return response.status(400).send('Key is required')
    }
    return InvitationGuest.query()
      .select('id', 'guestNames', 'isAttending', 'noOfGuestsAttending', 'maxGuests')
      .where('id', InvitationKey.query().select('invitation_guest_id').where('code', key).limit(1))
      .first()
      .then((invitationGuest) => {
        if (!invitationGuest) {
          return response.status(404).send('Guest not found')
        }

        return response.status(200).send(invitationGuest)
      })
  }

  checkKey({ request, response }: HttpContext) {
    const searchParams = request.qs()
    const key = searchParams.key

    if (!key) {
      return response.status(400).send('Key is required')
    }

    return InvitationKey.query()
      .where('code', key)
      .first()
      .then((invitationKey) => {
        if (!invitationKey) {
          return response.status(404).send('Key not found')
        }
        if (new Date(invitationKey.validUntil.toJSDate()) < new Date()) {
          return response.status(410).send('Key expired')
        }
        return response.status(200).send('Key found: ' + invitationKey.code)
      })
      .catch(() => {
        return response.status(500).send('Internal Server Error')
      })
  }
}
