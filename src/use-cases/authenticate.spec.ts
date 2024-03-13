import { expect, describe, it, beforeEach } from 'vitest'
import {  hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

beforeEach( () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
})

describe('Authenticate User Case', () => {
    it ('should be able to authenticate', async () =>{
       
        await usersRepository.create( {
            name: 'John',
            email: 'john@email.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: 'john@email.com',
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it ('should not be able to authenticate with wrong email', async () =>{
 
        await usersRepository.create( {
            name: 'John',
            email: 'john@email.com',
            password_hash: await hash('123456', 6),
        })

        await expect ( () => sut.execute({
            email: 'wrongEmail@email.com',
            password: '123456',
        })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
       
    })

    it ('should not be able to authenticate with wrong password', async () =>{

        await usersRepository.create( {
            name: 'John',
            email: 'john@email.com',
            password_hash: await hash('123456', 6),
        })

        await expect ( () => sut.execute({
            email: 'john@email.com',
            password: '12345678910',
        })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
       
    })

    
})

