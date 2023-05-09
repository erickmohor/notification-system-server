import { IConfigurationSchema } from '@/models/mongodb/configuration-model'
import { ConfigurationsRepository } from '@/repositories/configurations-repository'


interface UpdateSmsConfigurationUseCaseRequest {
  userId: string,
  provider: string,
  login: string,
  password: string,
}

interface UpdateSmsConfigurationUseCaseResponse {
  configuration: IConfigurationSchema
}


export class UpdateSmsConfigurationUseCase {
  constructor(private configurationsRepository: ConfigurationsRepository) {}

  async execute({
    userId, 
    provider,
    login,
    password
  }: UpdateSmsConfigurationUseCaseRequest): Promise<UpdateSmsConfigurationUseCaseResponse> {
    const userConfiguration = await this.configurationsRepository.findByUserId(userId)
  
    let configuration: IConfigurationSchema

    if (!userConfiguration) {
      configuration = await this.configurationsRepository.create({
        userId,
        sms: {
          provider,
          login,
          password
        }
      })
    } else {
      configuration = await this.configurationsRepository.update({
        userId,
        sms: {
          provider,
          login,
          password
        }
      })
    }
  
    return { configuration }
  }

}