import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invitation_keys'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable()
      table
        .integer('invitation_guest_id')
        .unsigned()
        .references('invitation_guests.id')
        .notNullable()
      table.timestamp('valid_until').notNullable()
      table.string('created_by')
      table.timestamp('created_at')
      table.string('updated_by')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
