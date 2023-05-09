import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'
import { authenticate } from './authenticate'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/auth', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}