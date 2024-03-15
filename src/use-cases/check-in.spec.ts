import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { compare } from 'bcryptjs'
import { CheckinUseCase } from './check-in'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-disntance-error'

let checkinsRepository: InMemoryCheckinsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

beforeEach( () => {
    checkinsRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
   
    sut = new CheckinUseCase(checkinsRepository, gymsRepository)

    gymsRepository.items.push({
        id: 'gym-01',
        title: 'Gym #01',
        description: 'Gym #01',
        phone: '222',
        latitude: new Decimal(0),
        longitude:  new Decimal(0),
    })


    vi.useFakeTimers()
})

afterEach( () => {
    vi.useFakeTimers()
})

describe('Check in User Case', () => {

    it ('should be able to check in', async () => {
        vi.setSystemTime(new Date(2022,0,1, 8, 0,0))
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,

        })
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it ('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022,0,1, 8, 0,0))
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,

        })
      
        await expect(() => 
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',  
                userLatitude: 0,
                userLongitude: 0,              
            }),
            
        ).rejects.toBeInstanceOf(Error)
    })

    it ('should be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2022,0,9, 8, 0,0))
        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,

        })
    
        vi.setSystemTime(new Date(2022,0,10, 8, 0,0))
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        })
        expect(checkIn.user_id).toEqual('user-01')
    })

    it ('should not be able to check in a distant gym', async () => {
        vi.setSystemTime(new Date(2022,0,1, 8, 0,0))
        
        await gymsRepository.create({
            id: 'gym-02',
            title: 'Gym #02',
            description: 'Gym #02',
            phone: '333',
            latitude: -27.8747279,
            longitude:  -49.4889672,
        })

        await expect(() => 
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-02',  
                userLatitude: -27.2892852,
                userLongitude: -49.6401091,              
            }),
            
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})

