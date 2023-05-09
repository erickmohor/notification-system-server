import { CreateWebPushMessageUseCase } from '../create-webpush-message'
import { MongoDbMessagesRepository } from '@/repositories/mongodb/mongodb-messages-repository'


export function makeCreateWebPushMessageUseCase() {
  const messagesRepository = new MongoDbMessagesRepository()
  const messagesUseCase = new CreateWebPushMessageUseCase(messagesRepository)

  return messagesUseCase
}