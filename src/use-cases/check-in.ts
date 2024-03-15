import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/checkins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-cordinates'
import { MaxDistanceError } from './errors/max-disntance-error'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUseCaseResponse{
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(
    private checkinsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository,) {}

  async execute({userId, gymId, userLatitude, userLongitude }: CheckinUseCaseRequest ): Promise<CheckinUseCaseResponse> {
    
    const gym = await this.gymsRepository.findById(gymId)
    if(!gym){
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {latitude: userLatitude , longitude: userLongitude},
      {latitude: gym.latitude.toNumber() , longitude: gym.longitude.toNumber()},
    )
    {
      const MAX_DISTANCE_IN_KILOMETERS = 0.1 
      if (distance > MAX_DISTANCE_IN_KILOMETERS){
        throw new MaxDistanceError()
      }
    }

    const checkInOnSameDay = await this.checkinsRepository.findByUserOnDate(userId, new Date())
    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
  })
    
    return {
      checkIn,
    }
  }

}
