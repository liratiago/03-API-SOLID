import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckinUseCase } from "../check-in"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"

export function makeCreateGymUseCase(){
    
    const gymsRepository = new PrismaGymsRepository()
    const createGymUseCase = new CreateGymUseCase( gymsRepository)

    return createGymUseCase
}