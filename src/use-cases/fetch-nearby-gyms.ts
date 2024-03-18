import { UserAlreadyExistsError } from '@/use-cases/errors/user-alredy-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym } from '@prisma/client'
import { hash } from 'bcryptjs'
import { FetchNearByGymsParams, GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymsUseCaseResponse{
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute( {userLatitude, userLongitude}: FetchNearByGymsUseCaseRequest ): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby(
        {
          latitude: userLatitude, 
          longitude: userLongitude,
        }
      )

    return { gyms }
  }
}
