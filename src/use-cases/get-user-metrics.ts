import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/checkins-repository'


interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse{
  checkIns: number
}

export class GetUserMetricsUseCase {
  constructor(
    private checkinsRepository: CheckinsRepository,
   ) {}

 
  async execute({userId}: GetUserMetricsUseCaseRequest ): Promise<GetUserMetricsUseCaseResponse> {
    const totalChekins = await this.checkinsRepository.countByUserId(userId)
    return totalChekins
  }

}
