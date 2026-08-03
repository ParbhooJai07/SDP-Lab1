import { beforeAll, afterAll } from 'vitest'
import { execSync } from 'node:child_process'
import { existsSync, unlinkSync } from 'node:fs'

const TEST_DB = 'prisma/test.db'

beforeAll(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
  execSync(`npx prisma migrate deploy`, {
    env: { ...process.env, DATABASE_URL: `file:./${TEST_DB}` },
  })
})

afterAll(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
})