import FamilyInvitation from '#models/family_invitation'
import FamilyInvitationGuest from '#models/family_invitation_guest'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Create family invitations
    const families = await FamilyInvitation.createMany([
      {
        familyName: 'Guest 1',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Malinao & Guest 1',
        maxGuests: 7,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 3',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 4',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 5',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 6',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 7',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Buboy Arriedo',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Wilfredo',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Cherry Derramas',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 12',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 13',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 14',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 15',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 16',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 17',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 18',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 19',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 20',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 21',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 22',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 23',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 24',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 25',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 26',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 27',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 28',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 29',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 30',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 31',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 32',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 33',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 34',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 35',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 36',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 37',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 39',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 40',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 41',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 42',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 43',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 44',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 45',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 46',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 47',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 48',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 49',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 50',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 51',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 52',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 53',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 54',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 55',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 56',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 57',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 58',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Guest 59',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])

    // Add guests to FamilyInvitationGuest table
    await FamilyInvitationGuest.createMany([
      // Guest 1
      {
        name: 'Guest 60',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 1')?.id || null,
      },
      {
        name: 'Guest 61',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 1')?.id || null,
      },
      {
        name: 'Guest 62',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 1')?.id || null,
      },
      // Malinao & Guest 1
      {
        name: 'Guest 63',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Guest 1')?.id || null,
      },
      {
        name: 'Guest 64',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Guest 1')?.id || null,
      },
      {
        name: 'Guest 65',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Guest 1')?.id || null,
      },
      {
        name: 'Guest 66',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Guest 1')?.id || null,
      },
      {
        name: 'Guest 67',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Guest 1')?.id || null,
      },
      {
        name: 'Guest 68',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Guest 1')?.id || null,
      },

      // Guest 3
      {
        name: 'Guest 69',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 3')?.id || null,
      },
      {
        name: 'Guest 70',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 3')?.id || null,
      },
      {
        name: 'Guest 71',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 3')?.id || null,
      },
      {
        name: 'Guest 72',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 3')?.id || null,
      },

      // Guest 4
      {
        name: 'Guest 73',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 4')?.id || null,
      },
      {
        name: 'Guest 74',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 4')?.id || null,
      },

      // Guest 5
      {
        name: 'Guest 75',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 5')?.id ||
          null,
      },
      {
        name: 'Guest 76',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 5')?.id ||
          null,
      },
      {
        name: 'Guest 77',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 5')?.id ||
          null,
      },
      {
        name: 'Guest 78',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 5')?.id ||
          null,
      },
      {
        name: 'Guest 79',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 5')?.id ||
          null,
      },

      // Guest 6
      {
        name: 'Guest 80',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 6')?.id ||
          null,
      },
      {
        name: 'Guest 81',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 6')?.id ||
          null,
      },
      {
        name: 'Guest 82',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 6')?.id ||
          null,
      },
      {
        name: 'Guest 83',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 6')?.id ||
          null,
      },
      {
        name: 'Guest 84',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 6')?.id ||
          null,
      },

      // Guest 7
      {
        name: 'Guest 85',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 7')?.id || null,
      },
      {
        name: 'Guest 86',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 7')?.id || null,
      },
      {
        name: 'Guest 87',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 7')?.id || null,
      },

      // Mr. & Mrs. Buboy Arriedo
      {
        name: 'Mr. Buboy Arriedo',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Buboy Arriedo')?.id || null,
      },
      {
        name: 'Mrs. Cyra Arriedo',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Buboy Arriedo')?.id || null,
      },
      {
        name: 'Ms. Sophia Arriedo',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Buboy Arriedo')?.id || null,
      },

      // Mr. Wilfredo
      {
        name: 'Mr. Wilfredo',
        familyInvitationId: families.find((f) => f.familyName === 'Mr. Wilfredo')?.id || null,
      },

      // Mrs. Cherry Derramas
      {
        name: 'Mrs. Cherry Derramas',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Cherry Derramas')?.id || null,
      },

      // Guest 12
      {
        name: 'Guest 92',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 12')?.id || null,
      },
      {
        name: 'Guest 93',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 12')?.id || null,
      },
      {
        name: 'Guest 94',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 12')?.id || null,
      },

      // Guest 13
      {
        name: 'Guest 95',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 13')?.id || null,
      },
      {
        name: 'Guest 96',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 13')?.id || null,
      },
      {
        name: 'Guest 97',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 13')?.id || null,
      },
      {
        name: 'Guest 98',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 13')?.id || null,
      },

      // Guest 14
      {
        name: 'Guest 99',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 14')?.id || null,
      },
      {
        name: 'Guest 100',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 14')?.id || null,
      },

      // Guest 15
      {
        name: 'Guest 101',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 15')?.id || null,
      },
      {
        name: 'Guest 102',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 15')?.id || null,
      },
      {
        name: 'Guest 103',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 15')?.id || null,
      },
      {
        name: 'Guest 104',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 15')?.id || null,
      },
      {
        name: 'Guest 105',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 15')?.id || null,
      },

      // Guest 16
      {
        name: 'Guest 106',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 16')?.id || null,
      },
      {
        name: 'Guest 107',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 16')?.id || null,
      },

      // Guest 17
      {
        name: 'Guest 17',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 17')?.id || null,
      },

      // Guest 18
      {
        name: 'Guest 108',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 18')?.id || null,
      },
      {
        name: 'Guest 109',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 18')?.id || null,
      },
      {
        name: 'Guest 110',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 18')?.id || null,
      },
      {
        name: 'Guest 111',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 18')?.id || null,
      },

      // Guest 19
      {
        name: 'Guest 112',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 19')?.id ||
          null,
      },
      {
        name: 'Guest 113',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 19')?.id ||
          null,
      },

      // Guest 20
      {
        name: 'Guest 114',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 20')?.id || null,
      },
      {
        name: 'Guest 115',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 20')?.id || null,
      },
      {
        name: 'Guest 116',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 20')?.id || null,
      },
      {
        name: 'Guest 117',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 20')?.id || null,
      },
      {
        name: 'Guest 118',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 20')?.id || null,
      },

      // Guest 21
      {
        name: 'Guest 119',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 21')?.id || null,
      },
      {
        name: 'Guest 120',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 21')?.id || null,
      },
      {
        name: 'Guest 121',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 21')?.id || null,
      },

      // Guest 22
      {
        name: 'Guest 122',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 22')?.id || null,
      },
      {
        name: 'Guest 123',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 22')?.id || null,
      },
      {
        name: 'Guest 124',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 22')?.id || null,
      },

      // Guest 23
      {
        name: 'Member 1',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 23')?.id || null,
      },
      {
        name: 'Member 2',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 23')?.id || null,
      },
      {
        name: 'Member 3',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 23')?.id || null,
      },
      {
        name: 'Member 4',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 23')?.id || null,
      },
      {
        name: 'Member 5',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 23')?.id || null,
      },

      // Guest 24
      {
        name: 'Member 1',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 24')?.id || null,
      },
      {
        name: 'Member 2',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 24')?.id || null,
      },
      {
        name: 'Member 3',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 24')?.id || null,
      },
      {
        name: 'Member 4',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 24')?.id || null,
      },
      {
        name: 'Member 5',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 24')?.id || null,
      },

      // Guest 25
      {
        name: 'Guest 125',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 25')?.id || null,
      },
      {
        name: 'Guest 126',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 25')?.id || null,
      },

      // Guest 26
      {
        name: 'Guest 127',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 26')?.id || null,
      },
      {
        name: 'Guest 128',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 26')?.id || null,
      },
      {
        name: 'Guest 129',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 26')?.id || null,
      },

      // Guest 27
      {
        name: 'Guest 130',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 27')?.id ||
          null,
      },
      {
        name: 'Guest 131',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 27')?.id ||
          null,
      },

      // Guest 28
      {
        name: 'Guest 132',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 28')?.id || null,
      },
      {
        name: 'Guest 133',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 28')?.id || null,
      },

      // Guest 29
      {
        name: 'Guest 29',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 29')?.id || null,
      },

      // Guest 30
      {
        name: 'Guest 30',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 30')?.id || null,
      },

      // Guest 31
      {
        name: 'Guest 31',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 31')?.id || null,
      },

      // Guest 32
      {
        name: 'Guest 32',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 32')?.id || null,
      },

      // Guest 33
      {
        name: 'Guest 33',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 33')?.id || null,
      },

      // Guest 34
      {
        name: 'Guest 34',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 34')?.id || null,
      },

      // Guest 35
      {
        name: 'Guest 35',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 35')?.id || null,
      },

      // Guest 36
      {
        name: 'Guest 134',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 36')?.id || null,
      },
      {
        name: 'Guest 135',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 36')?.id || null,
      },
      {
        name: 'Guest 136',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 36')?.id || null,
      },
      {
        name: 'Guest 137',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 36')?.id || null,
      },

      // Guest 37
      {
        name: 'Guest 138',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 37')?.id || null,
      },
      {
        name: 'Guest 139',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 37')?.id || null,
      },
      {
        name: 'Guest 140',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 37')?.id || null,
      },
      {
        name: 'Guest 141',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 37')?.id || null,
      },

      // Guest 39
      {
        name: 'Guest 144',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 39')?.id || null,
      },
      {
        name: 'Guest 145',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 39')?.id || null,
      },
      {
        name: 'Guest 146',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 39')?.id || null,
      },

      // Guest 40
      {
        name: 'Guest 147',
        familyInvitationId:
          families.find(
            (f) => f.familyName === 'Guest 40'
          )?.id || null,
      },
      {
        name: 'Guest 148',
        familyInvitationId:
          families.find(
            (f) => f.familyName === 'Guest 40'
          )?.id || null,
      },

      // Guest 41
      {
        name: 'Guest 41',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 41')?.id || null,
      },

      // Guest 42
      {
        name: 'Guest 42',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 42')?.id || null,
      },

      // Guest 43
      {
        name: 'Guest 43',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 43')?.id || null,
      },

      // Guest 44
      {
        name: 'Guest 149',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 44')?.id || null,
      },
      {
        name: 'Guest 150',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 44')?.id || null,
      },
      {
        name: 'Guest 151',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 44')?.id || null,
      },
      {
        name: 'Guest 152',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 44')?.id || null,
      },

      // Guest 45
      {
        name: 'Guest 153',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 45')?.id || null,
      },
      {
        name: 'Guest 154',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 45')?.id || null,
      },
      {
        name: 'Guest 155',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 45')?.id || null,
      },

      // Guest 46
      {
        name: 'Guest 156',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 46')?.id || null,
      },
      {
        name: 'Guest 157',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 46')?.id || null,
      },
      {
        name: 'Guest 158',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 46')?.id || null,
      },
      {
        name: 'Guest 159',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 46')?.id || null,
      },
      {
        name: 'Guest 160',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 46')?.id || null,
      },

      // Guest 47
      {
        name: 'Guest 161',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 47')?.id || null,
      },
      {
        name: 'Guest 162',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 47')?.id || null,
      },

      // Guest 48
      {
        name: 'Guest 163',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 48')?.id || null,
      },
      {
        name: 'Guest 164',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 48')?.id || null,
      },

      // Guest 49
      {
        name: 'Guest 165',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 49')?.id || null,
      },
      {
        name: 'Guest 166',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 49')?.id || null,
      },

      // Guest 50
      {
        name: 'Guest 167',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 50')?.id || null,
      },
      {
        name: 'Guest 168',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 50')?.id || null,
      },

      // Guest 51
      {
        name: 'Guest 169',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 51')?.id || null,
      },
      {
        name: 'Guest 170',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 51')?.id || null,
      },

      // Guest 52
      {
        name: 'Guest 171',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 52')?.id || null,
      },
      {
        name: 'Guest 172',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 52')?.id || null,
      },

      // Guest 53
      {
        name: 'Guest 53',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 53')?.id || null,
      },

      // Guest 54
      {
        name: 'Guest 54',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 54')?.id || null,
      },
      // Under Guest 54 & Guest 173, add:
      {
        name: 'Guest 173',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 54')?.id || null,
      },
      // Add these entries to the `FamilyInvitationGuest.createMany` call
      {
        name: 'Guest 55',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 55')?.id || null,
      },
      {
        name: 'Guest 56',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 56')?.id || null,
      },
      {
        name: 'Guest 57',
        familyInvitationId:
          families.find((f) => f.familyName === 'Guest 57')?.id || null,
      },
      {
        name: 'Guest 58',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 58')?.id || null,
      },
      {
        name: 'Guest 59',
        familyInvitationId: families.find((f) => f.familyName === 'Guest 59')?.id || null,
      },
    ])
  }
}
