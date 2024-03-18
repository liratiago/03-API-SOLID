import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/checkins-repository'


interface FecthUserCheckinsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FecthUserCheckinsHistoryUseCaseResponse{
  checkIns: CheckIn[]
}

export class FecthUserCheckinsHistoryUseCase {
  constructor(
    private checkinsRepository: CheckinsRepository,
   ) {}

 
  async execute({userId, page}: FecthUserCheckinsHistoryUseCaseRequest ): Promise<FecthUserCheckinsHistoryUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(userId, page)
    return {
      checkIns,
    }
  }

}
