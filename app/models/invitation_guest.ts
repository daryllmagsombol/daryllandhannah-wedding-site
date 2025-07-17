import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import InvitationKey from './invitation_key.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class InvitationGuest extends BaseModel {
  @hasOne(() => InvitationKey)
  declare invitationKey: HasOne<typeof InvitationKey>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare guestNames: string

  @column()
  declare isAttending: number | null

  @column()
  declare noOfGuestsAttending: number

  @column()
  declare maxGuests: number

  @column()
  declare seatNumber: string | null

  @column()
  declare createdBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare family: string | null // Add the family field
}
