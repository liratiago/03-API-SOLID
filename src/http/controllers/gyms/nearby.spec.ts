import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import  request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'



describe('Nearby Gym (e2e)', () => {
    
    beforeAll(async() =>{
        await app.ready()
    } )

    afterAll(async() =>{
        await app.close()  
    })

    it ('should be able to list nearby gyms', async () => {

        
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Javascript Gym',
            description: 'Descripton Javascript gym',
            phone: '124578',
            latitude: -27.8747279,
            longitude:  -49.6481091,

        })
        
        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Python Gym',
            description: 'Descripton Python gym',
            phone: '895623',
            latitude: -27.8618928,
            longitude:  -49.5229501,

        })
        
      
        const response = await request (app.server)
            .get('/gyms/nearby')
            .query ({
                latitude: -27.8747279,
                longitude:  -49.6481091,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect (response.body.gyms).toEqual([
           expect.objectContaining({
                title: 'Javascript Gym'
           }),
        ])      
  
    })

})