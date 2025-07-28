import FamilyInvitation from '#models/family_invitation'
import FamilyInvitationGuest from '#models/family_invitation_guest'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Create family invitations
    const families = await FamilyInvitation.createMany([
      {
        familyName: 'Hadap',
        maxGuests: 10,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Segales',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Castro',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ganelo',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mora',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Clemente',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Juangco',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Placino',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Sugatan',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Evangelista',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Gizelle',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Laurente',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Bonifacio',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mayonado',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Vega',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Yu',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Borja',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Isidoro',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Anoche',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Palermo',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Coronel',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Sardina',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Sanidad',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Valerio-Narcelles',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Llave',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Cadapan',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Carillo',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Requino',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Panlilio',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Armea',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Batoon',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Cruz',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])

    // Add guests to FamilyInvitationGuest table
    await FamilyInvitationGuest.createMany([
      {
        name: 'Mr. & Mrs. Eustacio Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Alejandro Segales',
        familyInvitationId: families.find((f) => f.familyName === 'Segales')?.id || null,
      },
      {
        name: 'Guest 14',
        familyInvitationId: families.find((f) => f.familyName === 'Castro')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Alvin Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Guest 16',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mrs. Mischerre Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Guest 97',
        familyInvitationId: families.find((f) => f.familyName === 'Segales')?.id || null,
      },
      {
        name: 'Guest 103',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Guest 104',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Guest 98',
        familyInvitationId: families.find((f) => f.familyName === 'Segales')?.id || null,
      },
      {
        name: 'Guest 105',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Guest 18',
        familyInvitationId: families.find((f) => f.familyName === 'Ganelo')?.id || null,
      },
      {
        name: 'Guest 22',
        familyInvitationId: families.find((f) => f.familyName === 'Mora')?.id || null,
      },
      {
        name: 'Mrs. Fermina Clemente',
        familyInvitationId: families.find((f) => f.familyName === 'Clemente')?.id || null,
      },
      {
        name: 'Guest 112',
        familyInvitationId: families.find((f) => f.familyName === 'Clemente')?.id || null,
      },
      {
        name: 'Guest 114 & Family',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Guest 21',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Guest 26 and Lucas',
        familyInvitationId: families.find((f) => f.familyName === 'Juangco')?.id || null,
      },
      {
        name: 'Guest 25',
        familyInvitationId: families.find((f) => f.familyName === 'Placino')?.id || null,
      },
      {
        name: 'Ms. Grace Sugatan',
        familyInvitationId: families.find((f) => f.familyName === 'Sugatan')?.id || null,
      },
      {
        name: 'Guest 28',
        familyInvitationId: families.find((f) => f.familyName === 'Evangelista')?.id || null,
      },
      {
        name: 'Ms. Gizelle and Ms. Renalyn',
        familyInvitationId: families.find((f) => f.familyName === 'Gizelle')?.id || null,
      },
      {
        name: 'Ms. Gwenn Laurente',
        familyInvitationId: families.find((f) => f.familyName === 'Laurente')?.id || null,
      },
      {
        name: 'Guest 29',
        familyInvitationId: families.find((f) => f.familyName === 'Bonifacio')?.id || null,
      },
      {
        name: 'Guest 31',
        familyInvitationId: families.find((f) => f.familyName === 'Mayonado')?.id || null,
      },
      {
        name: 'Guest 32',
        familyInvitationId: families.find((f) => f.familyName === 'Vega')?.id || null,
      },
      {
        name: 'Guest 34',
        familyInvitationId: families.find((f) => f.familyName === 'Yu')?.id || null,
      },
      {
        name: 'Guest 33',
        familyInvitationId: families.find((f) => f.familyName === 'Borja')?.id || null,
      },
      {
        name: 'Guest 35',
        familyInvitationId: families.find((f) => f.familyName === 'Anadon')?.id || null,
      },
      {
        name: 'Dr. Edward & Dr. Florence Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro')?.id || null,
      },
      {
        name: 'Guest 136',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro')?.id || null,
      },
      {
        name: 'Guest 137',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro')?.id || null,
      },
      {
        name: 'Ptr. Clinton & Guest 154 & Isla Flora Garce',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Guest 41',
        familyInvitationId: families.find((f) => f.familyName === 'Palermo')?.id || null,
      },
      {
        name: 'Rev. Carlo Jeffrey and Guest 139',
        familyInvitationId: families.find((f) => f.familyName === 'Coronel')?.id || null,
      },
      {
        name: 'Rev. Jerald and Mrs. Lara Joy Sardina',
        familyInvitationId: families.find((f) => f.familyName === 'Sardina')?.id || null,
      },
      {
        name: 'Mrs. Adelaida Sardina',
        familyInvitationId: families.find((f) => f.familyName === 'Sardina')?.id || null,
      },
      {
        name: 'Mrs. Laura Sanidad',
        familyInvitationId: families.find((f) => f.familyName === 'Sanidad')?.id || null,
      },
      {
        name: 'Guest 40',
        familyInvitationId: families.find((f) => f.familyName === 'Valerio-Narcelles')?.id || null,
      },
      {
        name: 'Guest 161 and Mr. David Joshua Llave',
        familyInvitationId: families.find((f) => f.familyName === 'Llave')?.id || null,
      },
      {
        name: 'Ptr. Renen Nathan & Guest 164',
        familyInvitationId: families.find((f) => f.familyName === 'Cadapan')?.id || null,
      },
      {
        name: 'Mr. Joshua Carillo & Guest 160',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo')?.id || null,
      },
      {
        name: 'Mr. and Mrs. Romeo Jr. Requino',
        familyInvitationId: families.find((f) => f.familyName === 'Requino')?.id || null,
      },
      {
        name: 'Ptr. Lincoln & Guest 150',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Guest 152',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Guest 151',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Jupet Carillo',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo')?.id || null,
      },
      {
        name: 'Guest 158',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo')?.id || null,
      },
      {
        name: 'Guest 50',
        familyInvitationId: families.find((f) => f.familyName === 'Gumaya')?.id || null,
      },
      {
        name: 'Guest 42',
        familyInvitationId: families.find((f) => f.familyName === 'Andres')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Pedrian Panlilio',
        familyInvitationId: families.find((f) => f.familyName === 'Panlilio')?.id || null,
      },
      {
        name: 'Ms. Baby Panlilio',
        familyInvitationId: families.find((f) => f.familyName === 'Panlilio')?.id || null,
      },
      {
        name: 'Guest 51',
        familyInvitationId: families.find((f) => f.familyName === 'Armea')?.id || null,
      },
      {
        name: 'Guest 52',
        familyInvitationId: families.find((f) => f.familyName === 'Batoon')?.id || null,
      },
      {
        name: 'Ms. Diane Jassen Cruz',
        familyInvitationId: families.find((f) => f.familyName === 'Cruz')?.id || null,
      },
    ])
  }
}
