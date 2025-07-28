import InvitationKey from '#models/invitation_key'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // await InvitationKey.createMany([
    //   {
    //     code: '1asd4fghj',
    //     invitationGuestId: 1,
    //     validUntil: DateTime.fromISO('2025-06-01T23:59:59'),
    //   },
    //   {
    //     code: '2asd5fghj',
    //     invitationGuestId: 2,
    //     validUntil: DateTime.fromISO('2025-06-01T23:59:59'),
    //   },
    //   {
    //     code: '3asd6fghj',
    //     invitationGuestId: 3,
    //     validUntil: DateTime.fromISO('2025-06-01T23:59:59'),
    //   },
    // ])
  }
}
