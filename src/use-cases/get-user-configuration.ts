import { ResourceNotFoundError } from './errors/resource-not-found'
import { IConfigurationSchema } from '@/models/mongodb/configuration-model'
import { ConfigurationsRepository } from '@/repositories/configurations-repository'


interface GetUserConfigurationUseCaseRequest {
  userId: string,
}

interface GetUserConfigurationUseCaseResponse {
  configuration: IConfigurationSchema
}


export class GetUserConfigurationUseCase {
  constructor(private configurationsRepository: ConfigurationsRepository) {}

  async execute({ userId }: GetUserConfigurationUseCaseRequest): Promise<GetUserConfigurationUseCaseResponse> {
    const configuration = await this.configurationsRepository.findByUserId(userId)

    if (!configuration) {
      throw new ResourceNotFoundError()
    }

    return { configuration }
  }


}