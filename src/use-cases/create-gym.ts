import { UserAlreadyExistsError } from '@/use-cases/errors/user-alredy-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym } from '@prisma/client'
import { hash } from 'bcryptjs'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude:  number
}

interface CreateGymUseCaseResponse{
  gym:Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
     longitude,
    })

    return {
      gym
    }
  }
}
