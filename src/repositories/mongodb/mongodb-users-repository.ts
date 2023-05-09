import { UsersRepository } from '../users-repository'
import { IUserSchema, UserModel } from '@/models/mongodb/user-model'


export class MongoDbUsersRepository implements UsersRepository {
  async create(data: IUserSchema) {
    const user = await UserModel.create(data)
    
    return user
  }
  
  async findById(id: string) {
    const user = await UserModel.findById(id)

    return user
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email })

    return user
  }
}