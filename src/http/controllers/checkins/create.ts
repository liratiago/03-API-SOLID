import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeCheckInsUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  
  const createCheckInParamsSchema = z.object({
    gymId: z.coerce.string().uuid(),
  })


  const createCheckInBodyParametrs = z.object({
    latitude: z.coerce.number().refine(value => { 
        return  Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine(value => { 
        return  Math.abs(value) <= 90
      }),
  })

  const { latitude, longitude } = createCheckInBodyParametrs.parse(request.body)

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const  checkInUseCase = makeCheckInsUseCase() 

  await checkInUseCase.execute({ 
    gymId,
    userId: request.user.sub,
    userLatitude: latitude, 
    userLongitude: longitude,
 })

  return reply.status(201).send()
}
