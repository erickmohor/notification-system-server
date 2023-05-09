import { UpdateApplicationConfigurationUseCase } from '../update-application-configuration'
import { MongoDbConfigurationsRepository } from '@/repositories/mongodb/mongodb-configurations-repository'


export function makeUpdateApplicationConfigurationUseCase() {
  const configurationsRepository = new MongoDbConfigurationsRepository()
  const configurationUseCase = new UpdateApplicationConfigurationUseCase(configurationsRepository)

  return configurationUseCase
}