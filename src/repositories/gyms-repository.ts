import { Prisma, Gym } from "@prisma/client";

export interface FetchNearByGymsParams {
    latitude: number;
    longitude: number;
  }

export interface GymsRepository{
    create (data: Prisma.GymCreateInput): Promise<Gym>
    findById(gymId: string): Promise<Gym | null> 
    findManyNearby(params: FetchNearByGymsParams ) : Promise<Gym[]>
    searchMany(query: string, page: number): Promise<Gym[]>
}

