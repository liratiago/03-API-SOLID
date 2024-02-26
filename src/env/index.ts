import 'dotenv/config'
import { z } from 'zod'

const envShema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envShema.safeParse(process.env)

if (_env.sucess ===git config --global core.autocrlf input false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
