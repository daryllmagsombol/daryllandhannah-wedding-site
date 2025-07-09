import InvitationGuest from '#models/invitation_guest'

export default class SeatInquiriesController {
  // Fetch all guest names and seat numbers
  public async fetchGuests({ response }: { response: any }) {
    try {
      const guests = await InvitationGuest.query().select('guestNames', 'seatNumber')
      const formattedGuests = guests.map((guest) => ({
        guestName: guest.guestNames,
        seatNumber: guest.seatNumber || 'Seat not yet assigned',
      }))
      return response.status(200).send(formattedGuests)
    } catch (error) {
      return response.status(500).send({ error: 'Failed to fetch guest list.' })
    }
  }
}
