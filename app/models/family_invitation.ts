import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import FamilyInvitationGuest from './family_invitation_guest.js'

export default class FamilyInvitation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare familyName: string

  @column()
  declare isAttending: number | null

  @column()
  declare noOfGuestsAttending: number

  @column()
  declare maxGuests: number

  @hasMany(() => FamilyInvitationGuest)
  declare guests: HasMany<typeof FamilyInvitationGuest>

  @column()
  declare createdBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
