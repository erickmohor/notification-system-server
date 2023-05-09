import { FetchUserMessagesHistoryUseCase } from '../fetch-user-messages-history'
import { MongoDbMessagesRepository } from '@/repositories/mongodb/mongodb-messages-repository'


export function makeFetchUserMessagesHistoryUseCase() {
  const messagesRepository = new MongoDbMessagesRepository()
  const messagesUseCase = new FetchUserMessagesHistoryUseCase(messagesRepository)

  return messagesUseCase
}