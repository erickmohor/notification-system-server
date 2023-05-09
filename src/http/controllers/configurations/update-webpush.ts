import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateWebPushConfigurationUseCase } from '@/use-cases/factories/make-update-webpush-configuration-use-case'


export async function updateWebPush(request: FastifyRequest, reply: FastifyReply) {
  const updateWebPushBodySchema = z.object({
    website: z.object({
      name: z.string().nonempty(),
      url: z.string().nonempty(),
      imageUrl: z.string(),
    }),
    permissionMessage: z.object({
      msg: z.string().nonempty(),
      allowButtonText: z.string().nonempty(),
      denyButtonText: z.string().nonempty(),
    }),
    welcome: z.object({
      title: z.string().nonempty(),
      msg: z.string().nonempty(),
      enableUrl: z.boolean(),
      url: z.string(),
    }),
  })

  const { permissionMessage, website, welcome } = updateWebPushBodySchema.parse(request.body)

  const updateWebPushUseCase = makeUpdateWebPushConfigurationUseCase()
  
  const configuration = await updateWebPushUseCase.execute({ 
    userId: request.user.sub,
    permissionMessage,
    website,
    welcome
  })
    
  return reply.status(200).send({ configuration })
}