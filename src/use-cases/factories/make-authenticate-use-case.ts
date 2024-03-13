import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase(){
    const primaUsersRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(primaUsersRepository)

    return authenticateUseCase
}