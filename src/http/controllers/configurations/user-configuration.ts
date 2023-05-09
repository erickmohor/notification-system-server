import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserConfigurationUseCase } from '@/use-cases/factories/make-get-user-configuration-use-case'

export async function userConfiguration(request: FastifyRequest, reply: FastifyReply) {
  const getUserConfigurationUseCase = makeGetUserConfigurationUseCase()

  const { configuration } = await getUserConfigurationUseCase.execute({ 
    userId: request.user.sub,
  })

  return reply.status(200).send({ configuration })
}