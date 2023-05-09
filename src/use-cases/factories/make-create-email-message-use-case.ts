import { CreateEmailMessageUseCase } from '../create-email-message'
import { MongoDbMessagesRepository } from '@/repositories/mongodb/mongodb-messages-repository'


export function makeCreateEmailMessageUseCase() {
  const messagesRepository = new MongoDbMessagesRepository()
  const messagesUseCase = new CreateEmailMessageUseCase(messagesRepository)

  return messagesUseCase
}