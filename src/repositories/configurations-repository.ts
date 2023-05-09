import { IConfigurationSchema, IConfigurationUncheckedSchema } from '@/models/mongodb/configuration-model'


export interface ConfigurationsRepository {
  create(data: IConfigurationUncheckedSchema): Promise<IConfigurationSchema>
  update(data: IConfigurationUncheckedSchema): Promise<IConfigurationSchema>
  findByUserId(userId: string): Promise<IConfigurationSchema | null>
}