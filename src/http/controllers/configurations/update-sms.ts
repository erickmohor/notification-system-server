import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateSmsConfigurationUseCase } from '@/use-cases/factories/make-update-sms-configuration-use-case'


export async function updateSms(request: FastifyRequest, reply: FastifyReply) {
  const updateSmsBodySchema = z.object({
    provider: z.string().nonempty(),
    login: z.string().nonempty(),
    password: z.string(),
  })

  const { provider, login, password } = updateSmsBodySchema.parse(request.body)

  const updateSmsUseCase = makeUpdateSmsConfigurationUseCase()
  
  const configuration = await updateSmsUseCase.execute({ 
    userId: request.user.sub,
    provider,
    login,
    password
  })
    
  return reply.status(200).send({ configuration })
}