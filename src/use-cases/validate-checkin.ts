import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/checkins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-checkin-validation-error'


interface ValidateCheckinUseCaseRequest {
  checkInId: string,
}

interface ValidateCheckinUseCaseResponse{
  checkIn: CheckIn
}

export class ValidateCheckinUseCase {
  constructor(
    private checkinsRepository: CheckinsRepository
  ) {}

  async execute({checkInId}: ValidateCheckinUseCaseRequest ): Promise<ValidateCheckinUseCaseResponse> {
    
    const checkIn = await this.checkinsRepository.findById(checkInId)

    if(!checkIn){
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    this.checkinsRepository.save(checkIn)
    
    return {
      checkIn,
    }
  }

}
