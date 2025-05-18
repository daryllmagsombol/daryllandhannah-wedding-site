import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    User.createMany([
      {
        fullName: 'Admin User',
        email: 'admin1@example.com',
        username: 'admin1',
        password:
          '$scrypt$n=16384,r=8,p=1$53UpUbWeOm5AyUyU3/EkoA$wHzF4Hs9Hlq1fuR7aBUkZXc1AyuAKRkclf9jw/Llo17jqbE8Q6QUmdUu1FqexxWwCAQnz23QdeRs7O0gmP4wOA',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        fullName: 'Admin User 2',
        email: 'admin2@example.com',
        username: 'admin2',
        password:
          '$scrypt$n=16384,r=8,p=1$53UpUbWeOm5AyUyU3/EkoA$wHzF4Hs9Hlq1fuR7aBUkZXc1AyuAKRkclf9jw/Llo17jqbE8Q6QUmdUu1FqexxWwCAQnz23QdeRs7O0gmP4wOA',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])
  }
}
