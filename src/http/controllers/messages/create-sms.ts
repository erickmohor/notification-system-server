import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ExternalServiceError } from '@/use-cases/errors/external-service-error'
import { makeCreateSmsMessageUseCase } from '@/use-cases/factories/make-create-sms-message-use-case'


export async function createSms(request: FastifyRequest, reply: FastifyReply) {
  const createSmsMessageBodySchema = z.object({
    phones: z.string().array().nonempty(),
    message: z.string().nonempty(),
  })

  const { phones, message } = createSmsMessageBodySchema.parse(request.body)

  try {
    const smsMessageUseCase = makeCreateSmsMessageUseCase()
  
    await smsMessageUseCase.execute({ 
      userId: request.user.sub,
      channel: 'sms',
      date: new Date(),
      origin: 'platform',
      notification: {
        sms: {
          phones,
          message,
        }
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