import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Admin User',
        email: 'admin1@example.com',
        username: 'admin1',
        password: '-',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        fullName: 'Admin User 2',
        email: 'admin2@example.com',
        username: 'admin2',
        password: '-',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])
  }
}
