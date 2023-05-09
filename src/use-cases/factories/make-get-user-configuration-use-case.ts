import { GetUserConfigurationUseCase } from '../get-user-configuration'
import { MongoDbConfigurationsRepository } from '@/repositories/mongodb/mongodb-configurations-repository'


export function makeGetUserConfigurationUseCase() {
  const configurationsRepository = new MongoDbConfigurationsRepository()
  const configurationUseCase = new GetUserConfigurationUseCase(configurationsRepository)

  return configurationUseCase
}