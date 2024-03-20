import { expect, describe, it, beforeEach } from 'vitest'
import {  hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

beforeEach( () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
})

describe('Ger User Profile User Case', () => {
    it ('should be able to get user profile', async () =>{
       
        const newUser = await usersRepository.create( {
            name: 'John',
            email: 'john@email.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            userId: newUser.id,
        })
        expect(user.created_at).toEqual(newUser.created_at)
    })

    it ('should not be able to get user profile with wrong id', async () =>{
 
        const newUser = await usersRepository.create( {
            name: 'John',
            email: 'john@email.com',
            password_hash: await hash('123456', 6),
        })


        await expect ( () => sut.execute({
            id: 'wrongId',
        })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
       
    })



    
})

