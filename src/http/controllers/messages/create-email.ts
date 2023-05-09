import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ExternalServiceError } from '@/use-cases/errors/external-service-error'
import { makeCreateEmailMessageUseCase } from '@/use-cases/factories/make-create-email-message-use-case'


export async function createEmail(request: FastifyRequest, reply: FastifyReply) {
  const createEmailMessageBodySchema = z.object({
    recipientEmails: z.string().array().nonempty(),
    template: z.string().nonempty(),
  })

  const { recipientEmails, template } = createEmailMessageBodySchema.parse(request.body)

  try {
    const emailMessageUseCase = makeCreateEmailMessageUseCase()
  
    await emailMessageUseCase.execute({ 
      userId: request.user.sub,
      channel: 'email',
      date: new Date(),
      origin: 'platform',
      notification: {
        email: {
          recipientEmails,
          template,
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