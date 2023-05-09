import { IConfigurationSchema } from '@/models/mongodb/configuration-model'
import { ConfigurationsRepository } from '@/repositories/configurations-repository'


interface UpdateEmailConfigurationUseCaseRequest {
  userId: string,
  server: {
    name: string,
    port: string,
    login: string,
    password: string,
  },
  sender: {
    name: string,
    email: string,
  },
  templates: Array<{
    name: string,
    url: string,
  }>
}

interface UpdateEmailConfigurationUseCaseResponse {
  configuration: IConfigurationSchema
}


export class UpdateEmailConfigurationUseCase {
  constructor(private configurationsRepository: ConfigurationsRepository) {}

  async execute({
    userId, 
    server,
    sender,
    templates
  }: UpdateEmailConfigurationUseCaseRequest): Promise<UpdateEmailConfigurationUseCaseResponse> {
    const userConfiguration = await this.configurationsRepository.findByUserId(userId)
  
    let configuration: IConfigurationSchema

    if (!userConfiguration) {
      configuration = await this.configurationsRepository.create({
        userId,
        email: {
          server,
          sender,
          templates,
        }
      })
    } else {
      configuration = await this.configurationsRepository.update({
        userId,
        email: {
          server,
          sender,
          templates,
        }
      })
    }
  
    return { configuration }
  }

}