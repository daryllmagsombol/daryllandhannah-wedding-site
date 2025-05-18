import type { HttpContext } from '@adonisjs/core/http'

export function validateBodyFields({ request, response }: HttpContext) {
  const { guestNames, isAttending, noOfGuestsAttending, maxGuests } = request.body()

  if (!guestNames || isAttending === undefined || !noOfGuestsAttending || !maxGuests) {
    return response.status(400).send({ error: 'All fields are required' })
  }

  return true
}
