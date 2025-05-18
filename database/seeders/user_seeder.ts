import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Hannah Hadap',
        email: 'hadaphannah@gmail.com',
        username: 'hannah',
        password: 'imbabyadmin',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        fullName: 'Daryll Magsombol',
        email: 'darjosh012@gmail.com',
        username: 'darjosh',
        password: 'admin200.',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])
  }
}
