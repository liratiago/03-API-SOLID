import { makeGetUserPofileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(
  request: FastifyRequest,
   reply: FastifyReply) 
   {
    
    const getUserProfile = makeGetUserPofileUseCase()

    const { user } = await getUserProfile.execute({
      userId: request.user.sub
    })
    console.log(user)

  return reply.status(200).send({ user, })
}