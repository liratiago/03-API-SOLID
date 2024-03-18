import { expect, describe, it, beforeEach } from 'vitest'
import {  hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'
import { Decimal } from '@prisma/client/runtime/library'


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

beforeEach( () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
})

describe('Create Gym Use Case', () => {
    it ('should be able to create gym', async () =>{
       
        const newGym = await gymsRepository.create( {
            title: 'Gym #02',
            description: 'Gym #02',
            phone: '333',
            latitude: new Decimal(-27.8747279),
            longitude:  new Decimal(-49.4889672),
        })


        expect(newGym.id).toEqual(expect.any(String))
    })    
})

