import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"

export function makeGetUserPofileUseCase(){
    const primaUsersRepository = new PrismaUserRepository()
    const userProfileUseCase = new GetUserProfileUseCase(primaUsersRepository)

    return userProfileUseCase
}