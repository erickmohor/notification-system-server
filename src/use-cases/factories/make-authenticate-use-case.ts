import { AuthenticateUseCase } from '../authenticate'
import { MongoDbUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'


export function makeAuthenticateUseCase() {
  const usersRepository = new MongoDbUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}