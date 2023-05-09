import { ConfigurationsRepository } from '../configurations-repository'
import { ConfigurationModel, IConfigurationSchema } from '@/models/mongodb/configuration-model'


export class MongoDbConfigurationsRepository implements ConfigurationsRepository {
  async create(data: IConfigurationSchema) {
    const configuration = await ConfigurationModel.create(data)

    return configuration
  }

  async update(data: IConfigurationSchema) {
    const configuration = await ConfigurationModel.findOneAndUpdate({ userId: data.userId }, data)

    return configuration
  }

  async findByUserId(userId: string) {
    const configuration = await ConfigurationModel.findOne({ userId })

    return configuration
  }

}