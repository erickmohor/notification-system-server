import { IConfigurationSchema } from '@/models/mongodb/configuration-model'
import { ConfigurationsRepository } from '@/repositories/configurations-repository'


interface UpdateWebPushConfigurationUseCaseRequest {
  userId: string,
  website: {
    name: string,
    url: string,
    imageUrl: string,
  },
  permissionMessage: {
    msg: string,
    allowButtonText: string,
    denyButtonText: string,
  },
  welcome: {
    title: string,
    msg: string,
    enableUrl: boolean,
    url: string,
  },
}

interface UpdateWebPushConfigurationUseCaseResponse {
  configuration: IConfigurationSchema
}


export class UpdateWebPushConfigurationUseCase {
  constructor(private configurationsRepository: ConfigurationsRepository) {}

  async execute({
    userId, 
    permissionMessage,
    website,
    welcome
  }: UpdateWebPushConfigurationUseCaseRequest): Promise<UpdateWebPushConfigurationUseCaseResponse> {
    const userConfiguration = await this.configurationsRepository.findByUserId(userId)
  
    let configuration: IConfigurationSchema

    if (!userConfiguration) {
      configuration = await this.configurationsRepository.create({
        userId,
        webPush: {
          permissionMessage,
          website,
          welcome
        }
      })
    } else {
      configuration = await this.configurationsRepository.update({
        userId,
        webPush: {
          permissionMessage,
          website,
          welcome
        }
      })
    }
  
    return { configuration }
  }

}