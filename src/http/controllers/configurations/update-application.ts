import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateApplicationConfigurationUseCase } from '@/use-cases/factories/make-update-application-configuration-use-case'


export async function updateApplication(request: FastifyRequest, reply: FastifyReply) {
  const updateApplicationBodySchema = z.object({
    name: z.string().nonempty(),
    channels: z.object({
      email: z.boolean(),
      sms: z.boolean(),
      webpush: z.boolean(),
    }),
  })

  const { name, channels } = updateApplicationBodySchema.parse(request.body)

  const updateApplicationUseCase = makeUpdateApplicationConfigurationUseCase()
  
  const configuration = await updateApplicationUseCase.execute({ 
    userId: request.user.sub,
    application: {
      name,
      channels
    }
  })
    
  return reply.status(200).send({ configuration })
}