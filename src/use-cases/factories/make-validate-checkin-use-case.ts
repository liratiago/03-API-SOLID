import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckinUseCase } from "../check-in"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { ValidateCheckinUseCase } from "../validate-checkin"

export function makeValidateCheckinUseCase(){
    const primaCheckinsRepository = new PrismaCheckInsRepository()
    const validateCheckinUseCase = new ValidateCheckinUseCase(primaCheckinsRepository)

    return validateCheckinUseCase
}