/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { throttle } from '#start/limiter'

const LoginController = () => import('#controllers/login_controller')

const RsvpsController = () => import('#controllers/rsvps_controller')
const GuestsController = () => import('#controllers/guests_controller')

const SeatInquiriesController = () => import('#controllers/seat_inquiries_controller')

router.on('/').renderInertia('home', { title: 'The Wedding of Hannah and Daryll' })
router
  .on('/valentines')
  .renderInertia('valentines', { title: 'Valentines 2025 - Daryll and Hannah' })

router
  .group(() => {
    router.on('/').renderInertia('rsvp', { title: 'RSVP - Daryll and Hannah Wedding' })
    router.get('/view-invitation', [RsvpsController, 'getGuestInvitation'])
    router.post('/update-invitation', [RsvpsController, 'saveGuestInvitation'])
  })
  .prefix('/rsvp')
  .use(throttle)

router
  .group(() => {
    router
      .on('/')
      .renderInertia('seat-inquiry', { title: 'Find Your Seat - Daryll and Hannah Wedding' })
    router.get('/fetch-guests', [SeatInquiriesController, 'fetchGuests'])
  })
  .prefix('/seat-inquiry')

router
  .group(() => {
    router.get('/lists', [GuestsController, 'getGuestList'])
    router.get('/id', [GuestsController, 'getGuestById'])
    router.post('/create', [GuestsController, 'createGuest'])
    router.put('/update-guest', [GuestsController, 'updateGuest'])
    router.delete('/delete-guest', [GuestsController, 'deleteGuest'])
    router.post('/generate-invite-key/:id', [GuestsController, 'generateInviteKey'])
    router.post('/generate-all-invite-keys', [GuestsController, 'generateAllInviteKeys'])
  })
  .prefix('/guest')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .on('/guests')
  .renderInertia('admin/guests', { title: 'Guests Admin - Daryll and Hannah Wedding' })
router
  .on('/login')
  .renderInertia('admin-login', { title: 'Admin Login - Daryll and Hannah Wedding' })
  .use(throttle)
router.post('/login', [LoginController, 'login']).use(throttle)
