import { RegisterUseCase } from '../register'
import { MongoDbUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'


export function makeRegisterUseCase() {
  const usersRepository = new MongoDbUsersRepository()
  const userUseCase = new RegisterUseCase(usersRepository)

  return userUseCase
}