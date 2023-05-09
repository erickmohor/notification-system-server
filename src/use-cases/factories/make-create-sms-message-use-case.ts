import { CreateSmsMessageUseCase } from '../create-sms-message'
import { MongoDbMessagesRepository } from '@/repositories/mongodb/mongodb-messages-repository'


export function makeCreateSmsMessageUseCase() {
  const messagesRepository = new MongoDbMessagesRepository()
  const messagesUseCase = new CreateSmsMessageUseCase(messagesRepository)

  return messagesUseCase
}