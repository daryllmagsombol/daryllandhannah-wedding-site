import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invitation_guests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('guest_names').notNullable()
      table.boolean('is_attending').defaultTo(null)
      table.integer('no_of_guests_attending').defaultTo(0)
      table.boolean('max_guests').notNullable()
      table.string('seat_number').nullable()
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
