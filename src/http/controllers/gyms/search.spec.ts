import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import  request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { Decimal } from '@prisma/client/runtime/library'



describe('Search Gym (e2e)', () => {
    
    beforeAll(async() =>{
        await app.ready()
    } )

    afterAll(async() =>{
        await app.close()  
    })

    it ('should be able to search gym', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Javascript Gym',
            description: 'Descripton Javascript gym',
            phone: '124578',
            latitude: new Decimal(-27.8747279),
            longitude:  new Decimal(-49.4889672),

        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Python Gym',
            description: 'Descripton Python gym',
            phone: '895623',
            latitude: new Decimal(-27.8747279),
            longitude:  new Decimal(-49.4889672),

        })
        

        const response = await request (app.server)
            .get('/gyms/search')
            .query ({
                q: 'Javascript'
            })
            .set('Authorization', `Bearer ${token}`)
            

        expect(response.status).toEqual(200)
        
        expect (response.body.gyms).toEqual([
           expect.objectContaining({
                title: 'Javascript Gym'
           })
        ])     
        
        expect(response.body.gyms).toHaveLength(1)
  
    })

})