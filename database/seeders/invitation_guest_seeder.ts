import FamilyInvitation from '#models/family_invitation'
import FamilyInvitationGuest from '#models/family_invitation_guest'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Create family invitations
    const families = await FamilyInvitation.createMany([
      {
        familyName: 'Magsombol Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Malinao & Magsombol Family',
        maxGuests: 7,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Malabag and Family',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Christian Reynes',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Fernando Magsombol and Family',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Felix Magsombol and Family',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Anthony Magsombol',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Ernesto Ariedo',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Wilfredo Baloloy',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Jocelyn Malicdem',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Chery Deramas',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Hadap Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Segales Family',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Franco Castro',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Avin Hadap & Family',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Ronald Aldrin Hadap',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Precy Clemente',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Maxima Ganelo & Family',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Ricardo Clemente & Mrs. Rhea Lawsin',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Fredy Hadap & Family',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Evelyn Hadap & Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Cely Mora & Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mora Family',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'De Guzman Family',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Niel Placino',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Jaspher Juangco',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ms. Gizelle Lampitoc & Ms. Renalyn Argana',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Kelvin Evangelista',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ms. Jennalyn Bonifacio',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ms. Genevieve Gwenn Laurente',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ms. Chaicel Mayonado',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ms. Anna Michelle Vega',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ms. Pearl Borja',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Rafael Yu',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Teoderico Anadon',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Isidoro Family',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Coronel Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Panilio Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Sardiña Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. John Wendell Valerio & Ms. Nicole Joyzen Narcelles',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Justin Palermo',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Aaron John Andres',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Nico Profeta',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ptr. & Mrs. Lincoln Anoche',
        maxGuests: 4,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Anoche Family',
        maxGuests: 3,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Carillo Family',
        maxGuests: 5,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Llave Twins',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ptr. & Mrs. Renen Nathan Cadapan',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Romeo Jr. Requiño',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Christian Gumaya',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Carlos Armea',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. & Mrs. Justo Batoon',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Ms. Diane Jansen Cruz',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mrs. Grace Sugatan & Yanna',
        maxGuests: 2,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Agape Jeunide Teope',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Joben Binondo',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Ferdrian Melarpis',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Mr. Roi Magboo',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        familyName: 'Luz Fariñas',
        maxGuests: 1,
        isAttending: null,
        noOfGuestsAttending: 0,
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])

    // Add guests to FamilyInvitationGuest table
    await FamilyInvitationGuest.createMany([
      // Magsombol Family
      {
        name: 'Mr. Donato Magsombol',
        familyInvitationId: families.find((f) => f.familyName === 'Magsombol Family')?.id || null,
      },
      {
        name: 'Mrs. Eden Magsombol',
        familyInvitationId: families.find((f) => f.familyName === 'Magsombol Family')?.id || null,
      },
      {
        name: 'Ms. Daniela Isabel Magsombol',
        familyInvitationId: families.find((f) => f.familyName === 'Magsombol Family')?.id || null,
      },
      // Malinao & Magsombol Family
      {
        name: 'Mr. Archieven Malinao',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Magsombol Family')?.id || null,
      },
      {
        name: 'Mrs. Rosemarie Malinao',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Magsombol Family')?.id || null,
      },
      {
        name: 'Mr. Hanan Malinao',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Magsombol Family')?.id || null,
      },
      {
        name: 'Mr. AJ Malinao',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Magsombol Family')?.id || null,
      },
      {
        name: 'Ms. Keziah Faith Malinao',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Magsombol Family')?.id || null,
      },
      {
        name: 'Mr. Potenciano & Mrs. Rosa Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Malinao & Magsombol Family')?.id || null,
      },

      // Malabag and Family
      {
        name: 'Mr. Danilo Malabag',
        familyInvitationId: families.find((f) => f.familyName === 'Malabag and Family')?.id || null,
      },
      {
        name: 'Mrs. Julie Malabag',
        familyInvitationId: families.find((f) => f.familyName === 'Malabag and Family')?.id || null,
      },
      {
        name: 'Mr. Joel Malabag',
        familyInvitationId: families.find((f) => f.familyName === 'Malabag and Family')?.id || null,
      },
      {
        name: 'Ms. Jenny Malabag',
        familyInvitationId: families.find((f) => f.familyName === 'Malabag and Family')?.id || null,
      },

      // Mr. & Mrs. Christian Reynes
      {
        name: 'Mr. Christian Reynes',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Christian Reynes')?.id || null,
      },
      {
        name: 'Mrs. Jessyl Reynes',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Christian Reynes')?.id || null,
      },

      // Mr. & Mrs. Fernando Magsombol and Family
      {
        name: 'Mr. Fernando Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fernando Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Mrs. Maryann Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fernando Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Ms. Michelle Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fernando Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Ms. Mikhaela Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fernando Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Mr. Andy Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fernando Magsombol and Family')?.id ||
          null,
      },

      // Mr. & Mrs. Felix Magsombol and Family
      {
        name: 'Mr. Felix Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Felix Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Mrs. Vivian Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Felix Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Ms. Angelique Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Felix Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Ms. Abegail Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Felix Magsombol and Family')?.id ||
          null,
      },
      {
        name: 'Mr. Andrei Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Felix Magsombol and Family')?.id ||
          null,
      },

      // Mr. & Mrs. Anthony Magsombol
      {
        name: 'Mr. Anthony Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Anthony Magsombol')?.id || null,
      },
      {
        name: 'Mrs. Ovette Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Anthony Magsombol')?.id || null,
      },
      {
        name: 'Mr. Arthur Magsombol',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Anthony Magsombol')?.id || null,
      },

      // Mr. & Mrs. Ernesto Ariedo
      {
        name: 'Mr. Ernesto Ariedo II',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Ernesto Ariedo')?.id || null,
      },
      {
        name: 'Mrs. Cyra Ariedo',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Ernesto Ariedo')?.id || null,
      },
      {
        name: 'Ms. Sophia Ariedo',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Ernesto Ariedo')?.id || null,
      },

      // Mr. Wilfredo Baloloy
      {
        name: 'Mr. Wilfredo Baloloy',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. Wilfredo Baloloy')?.id || null,
      },

      // Mrs. Jocelyn Malicdem
      {
        name: 'Mrs. Jocelyn Malicdem',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Jocelyn Malicdem')?.id || null,
      },

      {
        name: 'Mr. Zoriano II Malicdem',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Jocelyn Malicdem')?.id || null,
      },

      // Mrs. Chery Deramas
      {
        name: 'Mrs. Chery Deramas',
        familyInvitationId: families.find((f) => f.familyName === 'Mrs. Chery Deramas')?.id || null,
      },

      // Hadap Family
      {
        name: 'Mr. Eustacio Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap Family')?.id || null,
      },
      {
        name: 'Mrs. Susana Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap Family')?.id || null,
      },
      {
        name: 'Ms. Mischerre Hadap',
        familyInvitationId: families.find((f) => f.familyName === 'Hadap Family')?.id || null,
      },

      // Segales Family
      {
        name: 'Mrs. Mirasol Segales',
        familyInvitationId: families.find((f) => f.familyName === 'Segales Family')?.id || null,
      },
      {
        name: 'Mr. Alejandro Segales',
        familyInvitationId: families.find((f) => f.familyName === 'Segales Family')?.id || null,
      },
      {
        name: 'Ms. Almira Margaret Segales',
        familyInvitationId: families.find((f) => f.familyName === 'Segales Family')?.id || null,
      },
      {
        name: 'Mr. Adriel Segales',
        familyInvitationId: families.find((f) => f.familyName === 'Segales Family')?.id || null,
      },

      // Mr. & Mrs. Franco Castro
      {
        name: 'Mrs. Sheryl Castro',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Franco Castro')?.id || null,
      },
      {
        name: 'Mr. Franco Castro',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Franco Castro')?.id || null,
      },

      // Mr. & Mrs. Avin Hadap & Family
      {
        name: 'Mr. Alvin Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Avin Hadap & Family')?.id || null,
      },
      {
        name: 'Mrs. Willybel Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Avin Hadap & Family')?.id || null,
      },
      {
        name: 'Ms. Shanessa Ghislaine Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Avin Hadap & Family')?.id || null,
      },
      {
        name: 'Mr. Akio Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Avin Hadap & Family')?.id || null,
      },
      {
        name: 'Mr. Hans Gabriel Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Avin Hadap & Family')?.id || null,
      },

      // Mr. & Mrs. Ronald Aldrin Hadap
      {
        name: 'Mr. Ronald Aldrin Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Ronald Aldrin Hadap')?.id || null,
      },
      {
        name: 'Mrs. Cleo Jane Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Ronald Aldrin Hadap')?.id || null,
      },

      // Mrs. Precy Clemente
      {
        name: 'Mrs. Precy Clemente',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Precy Clemente')?.id || null,
      },

      // Mrs. Maxima Ganelo & Family
      {
        name: 'Mrs. Maxima Ganelo',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Maxima Ganelo & Family')?.id || null,
      },
      {
        name: 'Ms. Helen Ganelo',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Maxima Ganelo & Family')?.id || null,
      },
      {
        name: 'Ms. Geraldine Relayosa',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Maxima Ganelo & Family')?.id || null,
      },
      {
        name: 'Ms. Jovy Relayosa',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Maxima Ganelo & Family')?.id || null,
      },

      // Mr. Ricardo Clemente & Mrs. Rhea Lawsin
      {
        name: 'Mr. Ricardo Clemente',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. Ricardo Clemente & Mrs. Rhea Lawsin')?.id ||
          null,
      },
      {
        name: 'Mrs. Rhea Lawsin',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. Ricardo Clemente & Mrs. Rhea Lawsin')?.id ||
          null,
      },

      // Mr. & Mrs. Fredy Hadap & Family
      {
        name: 'Mr. Fredy Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fredy Hadap & Family')?.id || null,
      },
      {
        name: 'Mrs. Marissa Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fredy Hadap & Family')?.id || null,
      },
      {
        name: 'Mrs. Cathy',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fredy Hadap & Family')?.id || null,
      },
      {
        name: 'Tito Fredy Driver',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fredy Hadap & Family')?.id || null,
      },
      {
        name: 'Mrs. Josie',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Fredy Hadap & Family')?.id || null,
      },

      // Mrs. Evelyn Hadap & Family
      {
        name: 'Mrs. Evelyn Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Evelyn Hadap & Family')?.id || null,
      },
      {
        name: 'Mr. Noel/Norvin Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Evelyn Hadap & Family')?.id || null,
      },
      {
        name: 'Ms. Normilyn Hadap',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Evelyn Hadap & Family')?.id || null,
      },

      // Mrs. Cely Mora & Family
      {
        name: 'Mrs. Cely Mora',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Cely Mora & Family')?.id || null,
      },
      {
        name: 'Mr. Wilfred Mora',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Cely Mora & Family')?.id || null,
      },
      {
        name: 'Mrs. Imee Mora',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Cely Mora & Family')?.id || null,
      },

      // Mora Family
      {
        name: 'Member 1',
        familyInvitationId: families.find((f) => f.familyName === 'Mora Family')?.id || null,
      },
      {
        name: 'Member 2',
        familyInvitationId: families.find((f) => f.familyName === 'Mora Family')?.id || null,
      },
      {
        name: 'Member 3',
        familyInvitationId: families.find((f) => f.familyName === 'Mora Family')?.id || null,
      },
      {
        name: 'Member 4',
        familyInvitationId: families.find((f) => f.familyName === 'Mora Family')?.id || null,
      },
      {
        name: 'Member 5',
        familyInvitationId: families.find((f) => f.familyName === 'Mora Family')?.id || null,
      },

      // De Guzman Family
      {
        name: 'Member 1',
        familyInvitationId: families.find((f) => f.familyName === 'De Guzman Family')?.id || null,
      },
      {
        name: 'Member 2',
        familyInvitationId: families.find((f) => f.familyName === 'De Guzman Family')?.id || null,
      },
      {
        name: 'Member 3',
        familyInvitationId: families.find((f) => f.familyName === 'De Guzman Family')?.id || null,
      },
      {
        name: 'Member 4',
        familyInvitationId: families.find((f) => f.familyName === 'De Guzman Family')?.id || null,
      },
      {
        name: 'Member 5',
        familyInvitationId: families.find((f) => f.familyName === 'De Guzman Family')?.id || null,
      },

      // Mr. & Mrs. Niel Placino
      {
        name: 'Mr. Niel Placino',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Niel Placino')?.id || null,
      },
      {
        name: 'Mrs. Gracie Allaine Placino',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Niel Placino')?.id || null,
      },

      // Mr. & Mrs. Jaspher Juangco
      {
        name: 'Mr. Jaspher Juangco',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Jaspher Juangco')?.id || null,
      },
      {
        name: 'Mrs. Apple Jane Juangco',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Jaspher Juangco')?.id || null,
      },
      {
        name: 'Johann Lucas Juangco',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Jaspher Juangco')?.id || null,
      },

      // Ms. Gizelle Lampitoc & Ms. Renalyn Argana
      {
        name: 'Ms. Gizelle Lampitoc',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ms. Gizelle Lampitoc & Ms. Renalyn Argana')?.id ||
          null,
      },
      {
        name: 'Ms. Renalyn Argana',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ms. Gizelle Lampitoc & Ms. Renalyn Argana')?.id ||
          null,
      },

      // Mr. & Mrs. Kelvin Evangelista
      {
        name: 'Mr. Kelvin Evangelista',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Kelvin Evangelista')?.id || null,
      },
      {
        name: 'Mrs. Chezka Evangelista',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Kelvin Evangelista')?.id || null,
      },

      // Ms. Jennalyn Bonifacio
      {
        name: 'Ms. Jennalyn Bonifacio',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ms. Jennalyn Bonifacio')?.id || null,
      },

      // Ms. Genevieve Gwenn Laurente
      {
        name: 'Ms. Genevieve Gwenn Laurente',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ms. Genevieve Gwenn Laurente')?.id || null,
      },

      // Ms. Chaicel Mayonado
      {
        name: 'Ms. Chaicel Mayonado',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ms. Chaicel Mayonado')?.id || null,
      },

      // Ms. Anna Michelle Vega
      {
        name: 'Ms. Anna Michelle Vega',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ms. Anna Michelle Vega')?.id || null,
      },

      // Ms. Pearl Borja
      {
        name: 'Ms. Pearl Borja',
        familyInvitationId: families.find((f) => f.familyName === 'Ms. Pearl Borja')?.id || null,
      },

      // Mr. Rafael Yu
      {
        name: 'Mr. Rafael Yu',
        familyInvitationId: families.find((f) => f.familyName === 'Mr. Rafael Yu')?.id || null,
      },

      // Mr. Teoderico Anadon
      {
        name: 'Mr. Teoderico Anadon',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. Teoderico Anadon')?.id || null,
      },

      // Isidoro Family
      {
        name: 'Dr. Edward Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro Family')?.id || null,
      },
      {
        name: 'Dr. Florence Tica-Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro Family')?.id || null,
      },
      {
        name: 'Ms. Hannah Nicole Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro Family')?.id || null,
      },
      {
        name: 'Mr. Edward Gavin Jr. Isidoro',
        familyInvitationId: families.find((f) => f.familyName === 'Isidoro Family')?.id || null,
      },

      // Coronel Family
      {
        name: 'Rev. Carlo Jeffrey Coronel',
        familyInvitationId: families.find((f) => f.familyName === 'Coronel Family')?.id || null,
      },
      {
        name: 'Mrs. April Love Coronel',
        familyInvitationId: families.find((f) => f.familyName === 'Coronel Family')?.id || null,
      },
      {
        name: 'Mrs. Venus Coronel',
        familyInvitationId: families.find((f) => f.familyName === 'Coronel Family')?.id || null,
      },

      //Panilio Family
      {
        name: 'Mrs. Vivian Panlilio',
        familyInvitationId: families.find((f) => f.familyName === 'Panilio Family')?.id || null,
      },
      {
        name: 'Mr. Pedrian Panlilio',
        familyInvitationId: families.find((f) => f.familyName === 'Panilio Family')?.id || null,
      },

      {
        name: 'Mrs. Darlette Panlilio',
        familyInvitationId: families.find((f) => f.familyName === 'Panilio Family')?.id || null,
      },

      // Sardiña Family
      {
        name: 'Rev. Jerald Sardiña',
        familyInvitationId: families.find((f) => f.familyName === 'Sardiña Family')?.id || null,
      },
      {
        name: 'Mrs. Lara Joyzen Sardiña',
        familyInvitationId: families.find((f) => f.familyName === 'Sardiña Family')?.id || null,
      },
      {
        name: 'Mrs. Adelaida Sardiña',
        familyInvitationId: families.find((f) => f.familyName === 'Sardiña Family')?.id || null,
      },

      // Mr. John Wendell Valerio & Ms. Nicole Joyzen Narcelles
      {
        name: 'Mr. John Wendell Valerio',
        familyInvitationId:
          families.find(
            (f) => f.familyName === 'Mr. John Wendell Valerio & Ms. Nicole Joyzen Narcelles'
          )?.id || null,
      },
      {
        name: 'Ms. Nicole Joyzen Narcelles',
        familyInvitationId:
          families.find(
            (f) => f.familyName === 'Mr. John Wendell Valerio & Ms. Nicole Joyzen Narcelles'
          )?.id || null,
      },

      // Mr. Justin Palermo
      {
        name: 'Mr. Justin Palermo',
        familyInvitationId: families.find((f) => f.familyName === 'Mr. Justin Palermo')?.id || null,
      },

      // Mr. Aaron John Andres
      {
        name: 'Mr. Aaron John Andres',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. Aaron John Andres')?.id || null,
      },

      // Mr. Nico Profeta
      {
        name: 'Mr. Nico Profeta',
        familyInvitationId: families.find((f) => f.familyName === 'Mr. Nico Profeta')?.id || null,
      },

      // Ptr. & Mrs. Lincoln Anoche
      {
        name: 'Ptr. Lincoln Anoche',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ptr. & Mrs. Lincoln Anoche')?.id || null,
      },
      {
        name: 'Mrs. Rustia Anoche',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ptr. & Mrs. Lincoln Anoche')?.id || null,
      },
      {
        name: 'Mr. Carl James Anoche',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ptr. & Mrs. Lincoln Anoche')?.id || null,
      },
      {
        name: 'Ms. Roslin Anoche',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ptr. & Mrs. Lincoln Anoche')?.id || null,
      },

      // Anoche Family
      {
        name: 'Ptr. Clinton Joshua Anoche',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche Family')?.id || null,
      },
      {
        name: 'Mrs. Bridgette Grace Anoche',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche Family')?.id || null,
      },
      {
        name: 'Isla Flora Grace Anoche',
        familyInvitationId: families.find((f) => f.familyName === 'Anoche Family')?.id || null,
      },

      // Carillo Family
      {
        name: 'Mr. Jupet Carillo',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo Family')?.id || null,
      },
      {
        name: 'Mrs. Anna Carillo',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo Family')?.id || null,
      },
      {
        name: 'Ms. Christine Nicole Carillo',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo Family')?.id || null,
      },
      {
        name: 'Mr. Allan Joshua Carillo',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo Family')?.id || null,
      },
      {
        name: 'Ms. Dorothy Herrera',
        familyInvitationId: families.find((f) => f.familyName === 'Carillo Family')?.id || null,
      },

      // Llave Twins
      {
        name: 'Mr. Peter Paul Llave',
        familyInvitationId: families.find((f) => f.familyName === 'Llave Twins')?.id || null,
      },
      {
        name: 'Ptr. David Joshua Llave',
        familyInvitationId: families.find((f) => f.familyName === 'Llave Twins')?.id || null,
      },

      // Ptr. & Mrs. Renen Nathan Cadapan
      {
        name: 'Ptr. Renen Nathan Cadapan',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ptr. & Mrs. Renen Nathan Cadapan')?.id || null,
      },
      {
        name: 'Mrs. Alma Cadapan',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ptr. & Mrs. Renen Nathan Cadapan')?.id || null,
      },

      // Mr. & Mrs. Romeo Jr. Requiño
      {
        name: 'Mr. Romeo Jr. Requiño',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Romeo Jr. Requiño')?.id || null,
      },
      {
        name: 'Mrs. Ednette Requiño',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Romeo Jr. Requiño')?.id || null,
      },

      // Mr. & Mrs. Christian Gumaya
      {
        name: 'Mr. Christian Gumaya',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Christian Gumaya')?.id || null,
      },
      {
        name: 'Mrs. Mizpah Gumaya',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Christian Gumaya')?.id || null,
      },

      // Mr. & Mrs. Carlos Armea
      {
        name: 'Mr. Carlos Armea',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Carlos Armea')?.id || null,
      },
      {
        name: 'Mrs. Rachelle Armea',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Carlos Armea')?.id || null,
      },

      // Mr. & Mrs. Justo Batoon
      {
        name: 'Mr. Justo Batoon',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Justo Batoon')?.id || null,
      },
      {
        name: 'Mrs. Nora Batoon',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. & Mrs. Justo Batoon')?.id || null,
      },

      // Ms. Diane Jansen Cruz
      {
        name: 'Ms. Diane Jansen Cruz',
        familyInvitationId:
          families.find((f) => f.familyName === 'Ms. Diane Jansen Cruz')?.id || null,
      },

      // Mrs. Grace Sugatan & Yanna
      {
        name: 'Mrs. Grace Sugatan & Yanna',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Grace Sugatan & Yanna')?.id || null,
      },
      // Under Mrs. Grace Sugatan & Yanna & Yanna, add:
      {
        name: 'Yanna',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mrs. Grace Sugatan & Yanna')?.id || null,
      },
      // Add these entries to the `FamilyInvitationGuest.createMany` call
      {
        name: 'Mr. Agape Jeunide Teope',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. Agape Jeunide Teope')?.id || null,
      },
      {
        name: 'Mr. Joben Binondo',
        familyInvitationId: families.find((f) => f.familyName === 'Mr. Joben Binondo')?.id || null,
      },
      {
        name: 'Mr. Ferdrian Melarpis',
        familyInvitationId:
          families.find((f) => f.familyName === 'Mr. Ferdrian Melarpis')?.id || null,
      },
      {
        name: 'Mr. Roi Magboo',
        familyInvitationId: families.find((f) => f.familyName === 'Mr. Roi Magboo')?.id || null,
      },
      {
        name: 'Luz Fariñas',
        familyInvitationId: families.find((f) => f.familyName === 'Luz Fariñas')?.id || null,
      },
    ])
  }
}
