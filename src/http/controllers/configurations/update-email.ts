import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateEmailConfigurationUseCase } from '@/use-cases/factories/make-update-email-configuration-use-case'


export async function updateEmail(request: FastifyRequest, reply: FastifyReply) {
  const updateEmailBodySchema = z.object({
    server: z.object({
      name: z.string().nonempty(),
      port: z.string().nonempty(),
      login: z.string().nonempty(),
      password: z.string().nonempty(),
    }),
    sender: z.object({
      name: z.string().nonempty(),
      email: z.string().nonempty(),
    }),
    templates: z.object({
      name: z.string(),
      url: z.string(),
    }).array()
  })

  const { server, sender, templates} = updateEmailBodySchema.parse(request.body)

  const updateEmailUseCase = makeUpdateEmailConfigurationUseCase()
  
  const configuration = await updateEmailUseCase.execute({ 
    userId: request.user.sub,
    server,
    sender,
    templates
  })
    
  return reply.status(200).send({ configuration })
}