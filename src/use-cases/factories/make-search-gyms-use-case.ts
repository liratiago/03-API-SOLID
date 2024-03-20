import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymsGymUseCase } from "../search-gyms"

export function makeSearchGymsUseCase(){
    const primaGymsRepository = new PrismaGymsRepository()
    const searchGymsUseCase = new SearchGymsGymUseCase(primaGymsRepository)

    return searchGymsUseCase
}