import 'dotenv/config'
import { randomUUID } from 'crypto'
import { Environment } from 'vitest'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'


function generateDatabaseURL(schema: string)
{
    if (!process.env.DATABASE_URL){
        throw new Error ('Please provide a DATABASE_URL environment variable.')
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema',schema)

    return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    
    const schema = randomUUID()
    const dataBaseURL = generateDatabaseURL(schema)
    
    process.env.DATABASE_URL = dataBaseURL
    execSync ('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`, )
        
        await prisma.$disconnect()
      },
    }
  },
  transformMode: 'ssr',
}