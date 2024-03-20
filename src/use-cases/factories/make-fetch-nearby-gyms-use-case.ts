import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase(){
    
    const gymsRepository = new PrismaGymsRepository()
    const fetchNearByGymUseCase = new FetchNearByGymsUseCase(gymsRepository)

    return fetchNearByGymUseCase
}