/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const RsvpsController = () => import('#controllers/rsvps_controller')
router.on('/').renderInertia('home')
router.on('/valentines').renderInertia('valentines')

router
  .group(() => {
    router.on('/').renderInertia('rsvp')
    router.get('/view-invitation', [RsvpsController, 'getGuestInvitation'])
    router.get('/check-key', [RsvpsController, 'checkKey'])
  })
  .prefix('/rsvp')
