import { IUserSchema } from '@/models/mongodb/user-model'


export interface UsersRepository {
  create(data: IUserSchema): Promise<IUserSchema>
  findById(id: string): Promise<IUserSchema | null>
  findByEmail(email: string): Promise<IUserSchema | null>
}