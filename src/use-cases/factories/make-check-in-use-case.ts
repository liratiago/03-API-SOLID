import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckinUseCase } from "../check-in"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCheckInsUseCase(){
    const primaCheckinsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const checkInsUseCase = new CheckinUseCase( primaCheckinsRepository, gymsRepository)

    return checkInsUseCase
}