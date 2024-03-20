import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { FecthUserCheckinsHistoryUseCase } from "../fetch-user-check-ins-history"

export function makeFetchUserCheckInsHistoryUseCase(){
    
    const checkInsRepository = new PrismaCheckInsRepository()
    const fetchUserCheckInsHistoryUseCase = new FecthUserCheckinsHistoryUseCase(checkInsRepository)

    return fetchUserCheckInsHistoryUseCase
}