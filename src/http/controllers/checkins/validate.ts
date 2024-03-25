
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckinUseCase } from '@/use-cases/factories/make-validate-checkin-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  
  const validateCheckInParamsSchema = z.object({
    checkInId: z.coerce.string().uuid(),
  })


  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const  validateCheckInUseCase = makeValidateCheckinUseCase() 

  await validateCheckInUseCase.execute({ 
    checkInId,
 })

  return reply.status(204).send()
}
