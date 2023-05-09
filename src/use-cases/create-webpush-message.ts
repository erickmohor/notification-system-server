import { IMessageSchema } from '@/models/mongodb/message-model'
import { ExternalServiceError } from './errors/external-service-error'
import { MessagesRepository } from '@/repositories/messages-repository'


interface CreateWebPushMessageUseCaseRequest {
  userId: string,
  channel: string,
  date: Date,
  origin: string,
  notification: {
    webPush: {
      audience: string,
      title: string,
      message: string,
      icon: string,
      url: string,
    },
  }
}

interface CreateWebPushMessageUseCaseResponse {
  message: IMessageSchema
}


export class CreateWebPushMessageUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute({ userId, channel, date, origin, notification }: CreateWebPushMessageUseCaseRequest): Promise<CreateWebPushMessageUseCaseResponse> {
  
    // Here will have the logic or call the integration logic of the webpush system with an external service.
    // For testing purposes, let's assume that the variable externalService will be true when it works (message 
    // sent by the external service)
    const externalService = true

    if (!externalService) {
      throw new ExternalServiceError()
    }

    const message = await this.messagesRepository.create({
      userId,
      channel,
      date,
      origin,
      notification
    })

    return { message }
  }

}