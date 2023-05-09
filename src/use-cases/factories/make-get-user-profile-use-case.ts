import { GetUserProfileUseCase } from '../get-user-profile'
import { MongoDbUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'


export function makeGetUserProfileUseCase() {
  const usersRepository = new MongoDbUsersRepository()
  const userUseCase = new GetUserProfileUseCase(usersRepository)

  return userUseCase
}