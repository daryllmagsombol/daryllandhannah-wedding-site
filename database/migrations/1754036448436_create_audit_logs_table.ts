import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'audit_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().nullable().references('id').inTable('users')
      table.string('ip_address', 45).notNullable()
      table.text('user_agent').nullable()
      table.string('request_method', 10).nullable()
      table.text('request_url').nullable()
      table.json('request_body').nullable()
      table.integer('response_status').nullable()
      table.json('response_body').nullable()
      table.text('error_message').nullable()
      table.string('created_by').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.string('updated_by').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
