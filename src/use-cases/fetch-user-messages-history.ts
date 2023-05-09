import { IMessageSchema } from '@/models/mongodb/message-model'
import { MessagesRepository } from '@/repositories/messages-repository'


interface FetchUserMessagesHistoryUseCaseRequest {
  userId: string,
  page: number,
}

interface FetchUserMessagesHistoryUseCaseResponse {
  messages: IMessageSchema[] | null
}


export class FetchUserMessagesHistoryUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute({ 
    userId, 
    page
  }: FetchUserMessagesHistoryUseCaseRequest): Promise<FetchUserMessagesHistoryUseCaseResponse> {
    const messages = await this.messagesRepository.findManyByUserId(userId, page)

    return { messages }
  }

}