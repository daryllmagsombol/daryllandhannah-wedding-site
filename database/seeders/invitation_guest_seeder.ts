import InvitationGuest from '#models/invitation_guest'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await InvitationGuest.createMany([
      {
        guestNames: 'Daniela',
        isAttending: null,
        noOfGuestsAttending: 0,
        maxGuests: 1,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        guestNames: 'Justin',
        isAttending: null,
        noOfGuestsAttending: 0,
        maxGuests: 1,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        guestNames: 'Isla, Pastor Ton, BG',
        isAttending: null,
        noOfGuestsAttending: 0,
        maxGuests: 3,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])
  }
}
