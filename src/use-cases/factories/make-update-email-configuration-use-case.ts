import { UpdateEmailConfigurationUseCase } from '../update-email-configuration'
import { MongoDbConfigurationsRepository } from '@/repositories/mongodb/mongodb-configurations-repository'


export function makeUpdateEmailConfigurationUseCase() {
  const configurationsRepository = new MongoDbConfigurationsRepository()
  const configurationUseCase = new UpdateEmailConfigurationUseCase(configurationsRepository)

  return configurationUseCase
}