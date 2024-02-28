import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUserRepository implements UsersRepository{
  async findByEmail(email: String) {
     const user = await prisma.user.findUnique({
        where: {
          email,
         },
       })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

 // async findUnique( {name, email, password} ){
   // return prisma.user.findUnique({
 //   where: {
 //     email,
//    },
//  })
//  }
}
