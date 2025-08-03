// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import FamilyInvitation from '#models/family_invitation'
import FamilyInvitationGuest from '#models/family_invitation_guest'

export default class StatisticsController {
  async getStatistics({ response }: HttpContext) {
    // Expected visitors (total guests)
    const expectedVisitors = await FamilyInvitationGuest.query().count('* as total')
    const totalVisitors = expectedVisitors[0]?.$extras.total ?? 0

    // Seating arrangement: group guests by tableNumber
    const guests = await FamilyInvitationGuest.query().select('name', 'tableNumber')
    const seatingMap: Record<string, string[]> = {}
    guests.forEach((guest) => {
      if (!guest.tableNumber) return
      if (!seatingMap[guest.tableNumber]) seatingMap[guest.tableNumber] = []
      seatingMap[guest.tableNumber].push(guest.name)
    })
    const seating = Object.entries(seatingMap).map(([tableNumber, g]) => ({
      tableNumber,
      guests: g,
    }))

    // Family groups: each family with its guests
    const families = await FamilyInvitation.query().preload('guests')
    const familyGroups = families.map((family) => ({
      familyName: family.familyName,
      isAttending: family.isAttending,
      noOfGuestsAttending: family.noOfGuestsAttending,
      updatedAt: family.updatedAt,
      guests: family.guests.map((g) => ({
        name: g.name,
        tableNumber: g.tableNumber,
      })),
    }))

    return response.ok({
      expectedVisitors: totalVisitors,
      seating,
      familyGroups,
    })
  }
}
