import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckinUseCase } from './validate-checkin'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-checkin-validation-error'

let checkinsRepository: InMemoryCheckinsRepository
let sut: ValidateCheckinUseCase

beforeEach( () => {
    checkinsRepository = new InMemoryCheckinsRepository()
    sut = new ValidateCheckinUseCase(checkinsRepository)
    vi.useFakeTimers()
})

afterEach( () => {
    vi.useFakeTimers()
})

describe('Validate check in User Case', () => {

    it ('should be able to validade check in', async () => {
       const createdCheckIn = await checkinsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1',
       })

       const { checkIn } = await sut.execute({checkInId: createdCheckIn.id,} )

       expect(checkIn.validated_at).toEqual(expect.any(Date))
       expect (checkinsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it ('should not be able to validade an inexistent check in', async () => { 
        await expect( () =>
            sut.execute(
                {
                    checkInId: 'inexistent',
                } 
            ),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
 
     })

    it ('should be able to validade check in after 20 minutes of its creation', async () => {
       
       vi.setSystemTime(new Date (2024, 0, 10, 13, 40)) 
       
       const createdCheckIn = await checkinsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1',
       })

       const twentyOneMinutesInMiliseconds = 1000 * 60 * 21 

       vi.advanceTimersByTime(twentyOneMinutesInMiliseconds)

       await expect(() =>
       sut.execute({
         checkInId: createdCheckIn.id,
       }),
     ).rejects.toBeInstanceOf(LateCheckInValidationError)

    })
})

