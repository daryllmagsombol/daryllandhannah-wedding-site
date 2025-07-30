import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import FamilyInvitation from './family_invitation.js'

export default class FamilyInvitationGuest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare familyInvitationId: number | null

  @belongsTo(() => FamilyInvitation)
  declare familyInvitation: BelongsTo<typeof FamilyInvitation>

  @column()
  declare tableNumber: string | null

  @column()
  declare createdBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
