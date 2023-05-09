import { UpdateWebPushConfigurationUseCase } from '../update-webpush-configuration'
import { MongoDbConfigurationsRepository } from '@/repositories/mongodb/mongodb-configurations-repository'


export function makeUpdateWebPushConfigurationUseCase() {
  const configurationsRepository = new MongoDbConfigurationsRepository()
  const configurationUseCase = new UpdateWebPushConfigurationUseCase(configurationsRepository)

  return configurationUseCase
}