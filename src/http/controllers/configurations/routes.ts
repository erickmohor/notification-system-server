import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { updateSms } from './update-sms'
import { updateEmail } from './update-email'
import { updateWebPush } from './update-webpush'
import { userConfiguration } from './user-configuration'
import { updateApplication } from './update-application'


export async function configurationsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  
  app.get('/configuration/me', userConfiguration)

  app.put('/configuration/sms', updateSms)
  app.put('/configuration/email', updateEmail)
  app.put('/configuration/webpush', updateWebPush)
  app.put('/configuration/application', updateApplication)
}