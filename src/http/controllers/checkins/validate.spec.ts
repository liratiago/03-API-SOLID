import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import  request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'


describe('Validate CheckIn (e2e)', () => {
    
    beforeAll(async() =>{
        await app.ready()
    } )

    afterAll(async() =>{
        await app.close()  
    })

    it ('should be able validate a check-in', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create ({ 
            data: { 
                title: 'Javascript Gym',
                latitude: -27.8747279,
                longitude:-49.4889672,
            },
        })

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id,
            }
        })


        const response = await request (app.server)
        .post(`/check-ins/${checkIn.id}/validate`)
        .set('Authorization', `Bearer ${token}`)
        .send ()

         expect(response.statusCode).toEqual(204)


        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id,
            },
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    
    })

})