import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FecthUserCheckinsHistoryUseCase } from './fetch-user-check-ins-history'


let checkinsRepository: InMemoryCheckinsRepository
let sut: FecthUserCheckinsHistoryUseCase

beforeEach( () => {
    checkinsRepository = new InMemoryCheckinsRepository()   
    sut = new FecthUserCheckinsHistoryUseCase(checkinsRepository)
    vi.useFakeTimers()
})

afterEach( () => {
    vi.useRealTimers()
})

describe('fetch user Check ins User Case', () => {

    it ('should be able to fetch check in history', async () => {
       
        await checkinsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-1' ,
        })
        
        await checkinsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-2' ,
        })
       
        await checkinsRepository.create({
            user_id: 'user-2',
            gym_id: 'gym-2' ,
        })

       const {checkIns} = await sut.execute({
        userId: 'user-1',
        page: 1,
       })
       
       expect(checkIns).toHaveLength(2)

       expect(checkIns).toEqual([
        expect.objectContaining({ gym_id: 'gym-1' }),
        expect.objectContaining({ gym_id: 'gym-2' }),
      ])
    })


    it ('should be able to fetch paginated check-in history', async () => {
       
        for (let i = 1; i <= 22; i++) { 
            await checkinsRepository.create({
                user_id: 'user-1',
                gym_id: `gym-${i}`,
            })
        }
              
        await checkinsRepository.create({
            user_id: 'user-2',
            gym_id: 'gym-2' ,
        })

       const {checkIns} = await sut.execute({
        userId: 'user-1',
        page: 2,
       })
       
       expect(checkIns).toHaveLength(2)
       
       expect(checkIns).toEqual([
        expect.objectContaining({ gym_id: 'gym-21' }),
        expect.objectContaining({ gym_id: 'gym-22' }),
      ])
    })
   
})

