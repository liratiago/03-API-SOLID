import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsGymUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'


let gymRepository: InMemoryGymsRepository
let sut: SearchGymsGymUseCase

beforeEach( () => {
    gymRepository = new InMemoryGymsRepository()   
    sut = new SearchGymsGymUseCase(gymRepository)
})

afterEach( () => {

})

describe('Search Gyms Use Case', () => {

    it ('should be able to search gyms by title', async () => {
       
        await gymRepository.create({
            title: 'java Gym',
            latitude: new Decimal(0),
             longitude:  new Decimal(0),
        })
        
        await gymRepository.create({
            title: 'node Gym',
            latitude: new Decimal(1),
            longitude:  new Decimal(1),
        })
 
        await gymRepository.create({
            title: 'Java gyms #1',
            latitude: new Decimal(1),
            longitude:  new Decimal(1),
        })
 

       const {gyms} = await sut.execute({
        query: 'Gym',
        page: 1,
       })

       expect(gyms).toHaveLength(2)

    })

    it ('should be able to fetch paginated gyms search', async () => {
       
        for (let i =1; i<= 22; i++){
        await gymRepository.create({
            title: `Gym #${i}`,
            latitude: new Decimal(i),
            longitude:  new Decimal(i),
        })
    }
        
       const {gyms} = await sut.execute({
        query: 'Gym',
        page: 2,
       })

       expect(gyms).toHaveLength(2)

       expect(gyms).toEqual([
         expect.objectContaining({title: 'Gym #21'}),
         expect.objectContaining({title: 'Gym #22'}),
       ])

    })
   

})

