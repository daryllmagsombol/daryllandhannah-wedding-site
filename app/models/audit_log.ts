import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AuditLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare ipAddress: string

  @column()
  declare userAgent: string | null

  @column()
  declare requestMethod: string | null

  @column()
  declare requestUrl: string | null

  @column()
  declare requestBody: any | null

  @column()
  declare responseStatus: number | null

  @column()
  declare responseBody: any | null

  @column()
  declare errorMessage: string | null

  @column()
  declare createdBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
