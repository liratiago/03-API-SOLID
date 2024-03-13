import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase(){
    const primaUsersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(primaUsersRepository)

    return registerUseCase
}