import { UserAlreadyExistsError } from '@/use-cases/errors/user-alredy-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym } from '@prisma/client'
import { hash } from 'bcryptjs'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse{
  gyms: Gym[]
}

export class SearchGymsGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page,)

    return {
      gyms
    }
  }
}
