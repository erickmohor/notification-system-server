import { IMessageSchema } from '@/models/mongodb/message-model'
import { ExternalServiceError } from './errors/external-service-error'
import { MessagesRepository } from '@/repositories/messages-repository'


interface CreateSmsMessageUseCaseRequest {
  userId: string,
  channel: string,
  date: Date,
  origin: string,
  notification: {
    sms: {
      phones: string[],
      message: string,
    },
  }
}

interface CreateSmsMessageUseCaseResponse {
  message: IMessageSchema
}

export class CreateSmsMessageUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute({ userId, channel, date, origin, notification }: CreateSmsMessageUseCaseRequest): Promise<CreateSmsMessageUseCaseResponse> {
  
    // Here will have the logic or call the integration logic of the sms system with an external service.
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