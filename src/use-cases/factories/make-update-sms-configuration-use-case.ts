import { UpdateSmsConfigurationUseCase } from '../update-sms-configuration'
import { MongoDbConfigurationsRepository } from '@/repositories/mongodb/mongodb-configurations-repository'


export function makeUpdateSmsConfigurationUseCase() {
  const configurationsRepository = new MongoDbConfigurationsRepository()
  const configurationUseCase = new UpdateSmsConfigurationUseCase(configurationsRepository)

  return configurationUseCase
}