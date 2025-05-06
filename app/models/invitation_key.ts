import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class InvitationKey extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare invitationGuestId: number | null

  @column.dateTime()
  declare validUntil: DateTime

  @column()
  declare createdBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
