import fastify from 'fastify'
import { PrismaClient } from '@prisma/Client'

export const app = fastify()

const prisma = new PrismaClient()
