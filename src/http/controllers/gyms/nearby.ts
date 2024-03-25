import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  
  const nearbyGymsQuerySchema = z.object({
    latitude:  z.coerce.number().refine(value => { 
      return  Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => { 
      return  Math.abs(value) <= 90
     
    }),
  })
 
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const  nearByGymsUseCase = makeFetchNearbyGymsUseCase() 
  const { gyms } = await nearByGymsUseCase.execute( {
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms, 
  })
}
