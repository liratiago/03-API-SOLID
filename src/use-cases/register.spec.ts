import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-alredy-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

beforeEach( () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
})

describe('Register User Case', () => {
    it ('should hash user upon registration', async () =>{

        const { user } = await sut.execute({
            name: 'John',
            email: 'john@email.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
        await expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it ('should not be able to register with the same email twice', async () =>{
    
        const email = "jose@jose.com"

        const { user } = await sut.execute({
            name: 'John',
            email: email,
            password: '123456',
        })

        await expect( () => 
        sut.execute({
                name: 'John',
                email: email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
               
    })

    it ('should not be able to register', async () =>{
        
        const email = "jose@jose.com"

        const { user } = await sut.execute({
            name: 'John',
            email: email,
            password: '123456',
        })

       await expect(user.id).toEqual(expect.any(String))
               
    })
})

