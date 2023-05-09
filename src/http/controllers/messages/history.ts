import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchUserMessagesHistoryUseCase } from '@/use-cases/factories/make-fetch-user-messages-history-use-case'


export async function history(request: FastifyRequest, reply: FastifyReply) {
  const messagesHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = messagesHistoryQuerySchema.parse(request.query)

  const fetchUserMessagesHistoryUseCase = makeFetchUserMessagesHistoryUseCase()

  const { messages } = await fetchUserMessagesHistoryUseCase.execute({ 
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ messages })
}