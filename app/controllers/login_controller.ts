import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.findBy('email', email)
      if (!user) {
        return response.status(401).send({ error: 'User not found' })
      }
      const passwordVerified = await hash.verify(user.password, password)

      if (passwordVerified) {
        const verifyUser = await User.verifyCredentials(email, password)

        const token = await User.accessTokens.create(verifyUser)
        return response.status(200).send({ message: 'Login successful', token })
      }
      return response.status(401).send({ error: 'Invalid credentials' })
    } catch (error) {
      if (error instanceof Error && (error as any).code === 'E_INVALID_CREDENTIALS') {
        return response.status(401).send({ error: 'Invalid credentials' })
      }
      return response.status(500).send({ error: 'Server error' })
    }
  }
}
