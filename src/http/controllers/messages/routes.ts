import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { history } from './history'
import { createSms } from './create-sms'
import { createEmail } from './create-email'
import { createWebPush } from './create-webpush'


export async function messagesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  
  app.get('/messages/history', history)

  app.post('/message/sms', createSms)
  app.post('/message/email', createEmail)
  app.post('/message/webpush', createWebPush)
}