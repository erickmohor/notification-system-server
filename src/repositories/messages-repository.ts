import { IMessageSchema, IMessageUncheckedSchema } from '@/models/mongodb/message-model'


export interface MessagesRepository {
  create(data: IMessageUncheckedSchema): Promise<IMessageSchema>
  findById(id: string): Promise<IMessageSchema | null>
  findManyByUserId(userId: string, page: number): Promise<IMessageSchema[] | null>
}