import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { ZodError } from 'zod'
import mongoose from 'mongoose'

import { env } from './env'

import { usersRoutes } from './http/controllers/users/routes'
import { messagesRoutes } from './http/controllers/messages/routes'
import { configurationsRoutes } from './http/controllers/configurations/routes'


export const app = fastify()

app.addHook('preHandler', (req, res, done) => {

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers',  '*')

  const isPreflight = /options/i.test(req.method)
  if (isPreflight) {
    return res.send()
  }
      
  done()
})

mongoose.connect(env.MONGO_DB_URL)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '7d'
  }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(messagesRoutes)
app.register(configurationsRoutes)

app.setErrorHandler( (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if ( env.NODE_ENV !== 'production' ) {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})