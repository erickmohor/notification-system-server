import { IConfigurationSchema } from '@/models/mongodb/configuration-model'
import { ConfigurationsRepository } from '@/repositories/configurations-repository'


interface UpdateApplicationConfigurationUseCaseRequest {
  userId: string,
  application: {
    name: string,
    channels: {
      email: boolean,
      sms: boolean,
      webpush: boolean,
    },
  }
}

interface UpdateApplicationConfigurationUseCaseResponse {
  configuration: IConfigurationSchema
}


export class UpdateApplicationConfigurationUseCase {
  constructor(private configurationsRepository: ConfigurationsRepository) {}

  async execute({
    userId, 
    application
  }: UpdateApplicationConfigurationUseCaseRequest): Promise<UpdateApplicationConfigurationUseCaseResponse> {
    const userConfiguration = await this.configurationsRepository.findByUserId(userId)
  
    let configuration: IConfigurationSchema

    if (!userConfiguration) {
      configuration = await this.configurationsRepository.create({
        userId,
        application
      })
    } else {
      configuration = await this.configurationsRepository.update({
        userId,
        application
      })
    }
  
    return { configuration }
  }

}