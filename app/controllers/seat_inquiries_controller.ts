import FamilyInvitation from '#models/family_invitation_guest'

export default class SeatInquiriesController {
  // Fetch all family invitations and their guests with seat numbers
  public async fetchGuests({ response }: { response: any }) {
    try {
      const guests = await FamilyInvitation.query()
        .select('name', 'tableNumber')
        .whereNotNull('tableNumber') // Select only necessary fields from FamilyInvitation

      return response.status(200).send(guests)
    } catch (error) {
      return response.status(500).send({ error: 'Failed to fetch family invitations and guests.' })
    }
  }
}
