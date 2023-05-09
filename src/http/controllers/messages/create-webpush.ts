import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ExternalServiceError } from '@/use-cases/errors/external-service-error'
import { makeCreateWebPushMessageUseCase } from '@/use-cases/factories/make-create-webpush-message-use-case'


export async function createWebPush(request: FastifyRequest, reply: FastifyReply) {
  const createWebPushMessageBodySchema = z.object({
    audience: z.string().nonempty(),
    message: z.object({
      title: z.string().nonempty(),
      message: z.string().nonempty(),
      icon: z.string(),
      url: z.string().nonempty(),
    }),
  })

  const { audience, message } = createWebPushMessageBodySchema.parse(request.body)

  try {
    const webPushMessageUseCase = makeCreateWebPushMessageUseCase()
  
    await webPushMessageUseCase.execute({ 
      userId: request.user.sub,
      channel: 'webpush',
      date: new Date(),
      origin: 'platform',
      notification: {
        webPush: {
          audience: audience,
          title: message.title,
          message: message.message,
          icon: message.icon,
          url: message.url,
        },
      } 
    })
    
  } catch (err) {
    if (err instanceof ExternalServiceError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}