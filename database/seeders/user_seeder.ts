import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    User.createMany([
      {
        fullName: 'Admin',
        email: 'admin@test.com',
        username: 'admin',
        password: '$2a$10$hfJayOoqKkob.ST4IA27hej5tb5Kf0auKk7aeDKSfsh.H6aQyDpMW',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        fullName: 'Admin User 2',
        email: 'admin2@example.com',
        username: 'admin2',
        password: '$2a$10$U24he1I66ZHRkYZU89sUpOQkys2tazrBm/m5OXHuyVdzGjl2w1K8y',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])
  }
}
