import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FecthUserCheckinsHistoryUseCase } from './fetch-user-check-ins-history'
import { GetUserMetricsUseCase } from './get-user-metrics'


let checkinsRepository: InMemoryCheckinsRepository
let sut: GetUserMetricsUseCase

beforeEach( () => {
    checkinsRepository = new InMemoryCheckinsRepository()   
    sut = new GetUserMetricsUseCase(checkinsRepository)
})

afterEach( () => {
})

describe('get user metrics Use Case', () => {

    it ('should be able to get checkins count from metrics', async () => {
       
      for (let i = 1; i <= 22; i++) { 
        await checkinsRepository.create({
            user_id: 'user-1',
            gym_id: `gym-${i}`,
        })
      }
        
      
      const totalUser1 = await sut.execute({
        userId: 'user-1',
       })

       const totalUser2 = await sut.execute({
        userId: 'user-2',
       })
       
       expect(totalUser1.checkInsCount).toEqual(22)
       expect(totalUser2.checkInsCount).toEqual(0)
    })
   
})

