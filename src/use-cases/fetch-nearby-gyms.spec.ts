import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsGymUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'
import { FetchNearByGymsParams } from '@/repositories/gyms-repository'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

beforeEach( () => {
    gymsRepository = new InMemoryGymsRepository()   
    sut = new FetchNearByGymsUseCase(gymsRepository)
})

afterEach( () => {

})

describe('Search nearby gyms use case ', () => {

    it ('should be able to fetch  nearby gyms', async () => {
       
        await gymsRepository.create({
            id: 'gym-01',
            title: 'Gym #01',
            description: 'Gym #01',
            phone: '1111',
            latitude: -27.8747279,
            longitude:  -49.6481091,
        })
        
        await gymsRepository.create({
            id: 'gym-02',
            title: 'Gym #02',
            description: 'Gym #02',
            phone: '2222',
            latitude: -27.8618928,
            longitude:  -49.5229501,
        })

       const {gyms} = await sut.execute({
        userLatitude: -27.8618928,
        userLongitude:  -49.5229501,
       })

       expect(gyms).toHaveLength(1)
       expect(gyms).toEqual([expect.objectContaining({title: 'Gym #02'})])
    })

    
   

})

