import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import  request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { Decimal } from '@prisma/client/runtime/library'



describe('Create Gym (e2e)', () => {
    
    beforeAll(async() =>{
        await app.ready()
    } )

    afterAll(async() =>{
        await app.close()  
    })

    it ('should be able to create gym', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Javascript Gym',
            description: 'Descripton gym',
            phone: '124578',
            latitude: new Decimal(-27.8747279),
            longitude:  new Decimal(-49.4889672),

        })
        
        expect(response.status).toEqual(201)
  
    })

})