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

const LoginController = () => import('#controllers/login_controller')

const RsvpsController = () => import('#controllers/rsvps_controller')
const GuestsController = () => import('#controllers/guests_controller')

const SeatInquiriesController = () => import('#controllers/seat_inquiries_controller')

router.on('/').renderInertia('home')
router.on('/valentines').renderInertia('valentines')

router
  .group(() => {
    router.on('/').renderInertia('rsvp')
    router.get('/view-invitation', [RsvpsController, 'getGuestInvitation'])
    router.post('/update-invitation', [RsvpsController, 'saveGuestInvitation'])
  })
  .prefix('/rsvp')

router
  .group(() => {
    router.on('/').renderInertia('seat-inquiry')
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
  })
  .prefix('/guest')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router.on('/guests').renderInertia('admin/guests')
router.on('/login').renderInertia('admin-login')
router.post('/login', [LoginController, 'login'])
