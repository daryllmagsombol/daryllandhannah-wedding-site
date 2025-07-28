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
        name: 'Mr. & Mrs. Franco Castro',
        familyInvitationId: families.find((f) => f.familyName === 'Castro')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Alvin Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Ronald Aldrin Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mrs. Mischerre Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Ms. Almira Margaret Segales',
        familyInvitationId: families.find((f) => f.familyName === 'Segales')?.id || null,
      },
      {
        name: 'Ms. Shanessa Ghislaine Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mr. Akio Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mr. Adriel Segales',
        familyInvitationId: families.find((f) => f.familyName === 'Segales')?.id || null,
      },
      {
        name: 'Mr. Hans Gabriel Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mrs. Maxima Ganelo & Family',
        familyInvitationId: families.find((f) => f.familyName === 'Ganelo')?.id || null,
      },
      {
        name: 'Mrs. Cely Mora & Family',
        familyInvitationId: families.find((f) => f.familyName === 'Mora')?.id || null,
      },
      {
        name: 'Mrs. Fermina Clemente',
        familyInvitationId: families.find((f) => f.familyName === 'Clemente')?.id || null,
      },
      {
        name: 'Mr. Ricardo Clemente',
        familyInvitationId: families.find((f) => f.familyName === 'Clemente')?.id || null,
      },
      {
        name: 'Mr. Fredy Hadap & Family',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mrs. Evelyn Hadap & Family',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Jaspher Juangco and Lucas',
        familyInvitationId: families.find((f) => f.familyName === 'Juangco')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Niel Placino',
        familyInvitationId: families.find((f) => f.familyName === 'Placino')?.id || null,
      },
      {
        name: 'Ms. Grace Sugatan',
        familyInvitationId: families.find((f) => f.familyName === 'Sugatan')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Kelvin Evangelista',
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
        name: 'Ms. Jennalyn Bonifacio',
        familyInvitationId: families.find((f) => f.familyName === 'Bonifacio')?.id || null,
      },
      {
        name: 'Ms. Chaicel Mayonado',
        familyInvitationId: families.find((f) => f.familyName === 'Mayonado')?.id || null,
      },
      {
        name: 'Ms. Anna Michelle Vega',
        familyInvitationId: families.find((f) => f.familyName === 'Vega')?.id || null,
      },
      {
        name: 'Mr. Rafael Yu',
        familyInvitationId: families.find((f) => f.familyName === 'Yu')?.id || null,
      },
      {
        name: 'Ms. Pearl Borja',
        familyInvitationId: families.find((f) => f.familyName === 'Borja')?.id || null,
      },
      {
        name: 'Mr. Teoderico Anadon',
        familyInvitationId: families.find((f) => f.familyName === 'Anadon')?.id || null,
      },
      {
        name: 'Dr. Edward & Dr. Florence Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro')?.id || null,
      },
      {
        name: 'Ms. Hannah Nicole Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro')?.id || null,
      },
      {
        name: 'Mr. Edward Gavin Jr. Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro')?.id || null,
      },
      {
        name: 'Ptr. Clinton & Mrs. Bridgette Grace Anoche & Isla Flora Garce',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Mr. Justin Palermo',
        familyInvitationId: families.find((f) => f.familyName === 'Palermo')?.id || null,
      },
      {
        name: 'Rev. Carlo Jeffrey and Mrs. April Love Coronel',
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
        name: 'Mr. John Wendell Valerio & Ms. Nicole Joyzen Narcelles',
        familyInvitationId: families.find((f) => f.familyName === 'Valerio-Narcelles')?.id || null,
      },
      {
        name: 'Mr. Peter Paul Llave and Mr. David Joshua Llave',
        familyInvitationId: families.find((f) => f.familyName === 'Llave')?.id || null,
      },
      {
        name: 'Ptr. Renen Nathan & Mrs. Alma Cadapan',
        familyInvitationId: families.find((f) => f.familyName === 'Cadapan')?.id || null,
      },
      {
        name: 'Mr. Joshua Carillo & Ms. Dorothy Herrera',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo')?.id || null,
      },
      {
        name: 'Mr. and Mrs. Romeo Jr. Requino',
        familyInvitationId: families.find((f) => f.familyName === 'Requino')?.id || null,
      },
      {
        name: 'Ptr. Lincoln & Mrs. Rustia Anoche',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Ms. Roslin Anoche',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Mr. Carl James Anoche',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Jupet Carillo',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo')?.id || null,
      },
      {
        name: 'Ms. Christine Nicole Carillo',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Christian Gumaya',
        familyInvitationId: families.find((f) => f.familyName === 'Gumaya')?.id || null,
      },
      {
        name: 'Mr. Aaron John Andres',
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
        name: 'Mr. & Mrs. Carlos Armea',
        familyInvitationId: families.find((f) => f.familyName === 'Armea')?.id || null,
      },
      {
        name: 'Mr. & Mrs. Justo Batoon',
        familyInvitationId: families.find((f) => f.familyName === 'Batoon')?.id || null,
      },
      {
        name: 'Ms. Diane Jassen Cruz',
        familyInvitationId: families.find((f) => f.familyName === 'Cruz')?.id || null,
      },
    ])
  }
}
