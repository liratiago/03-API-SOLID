import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verifyJWT'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'




export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
   
    app.post('/gyms', create )

    app.get('/gyms/search', search)

    app.get('/gyms/nearby', nearby )


}