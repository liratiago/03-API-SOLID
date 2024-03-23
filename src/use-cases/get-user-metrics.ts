import { CheckinsRepository } from '@/repositories/checkins-repository'


interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse{
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(
    private checkinsRepository: CheckinsRepository,
   ) {}

 
  async execute({userId}: GetUserMetricsUseCaseRequest ): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId)
  return { checkInsCount  }
  }

}
