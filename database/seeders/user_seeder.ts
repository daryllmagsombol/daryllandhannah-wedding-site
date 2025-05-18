import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    User.createMany([
      {
        fullName: 'Hannah Hadap',
        email: 'hadaphannah@gmail.com',
        username: 'hannah',
        password:
          '$scrypt$n=16384,r=8,p=1$53UpUbWeOm5AyUyU3/EkoA$wHzF4Hs9Hlq1fuR7aBUkZXc1AyuAKRkclf9jw/Llo17jqbE8Q6QUmdUu1FqexxWwCAQnz23QdeRs7O0gmP4wOA',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
      {
        fullName: 'Daryll Magsombol',
        email: 'darjosh012@gmail.com',
        username: 'darjosh',
        password:
          '$scrypt$n=16384,r=8,p=1$53UpUbWeOm5AyUyU3/EkoA$wHzF4Hs9Hlq1fuR7aBUkZXc1AyuAKRkclf9jw/Llo17jqbE8Q6QUmdUu1FqexxWwCAQnz23QdeRs7O0gmP4wOA',
        role: 'admin',
        createdBy: 'admin',
        updatedBy: 'admin',
      },
    ])
  }
}
