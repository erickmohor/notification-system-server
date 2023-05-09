import { MessagesRepository } from '../messages-repository'
import { IMessageSchema, MessageModel } from '@/models/mongodb/message-model'


export class MongoDbMessagesRepository implements MessagesRepository {
  async create(data: IMessageSchema) {
    const message = await MessageModel.create(data)

    return message
  }

  async findById(id: string) {
    const message = await MessageModel.findById(id)

    return message
  }

  async findManyByUserId(userId: string, page: number) {
    const messages = (await MessageModel.find({ userId }).limit(50).skip( (page - 1) * 50 )).reverse()

    return messages
  }

}