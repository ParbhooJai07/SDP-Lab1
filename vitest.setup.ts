import { beforeAll } from 'vitest'
import { execSync } from 'node:child_process'
import { existsSync, unlinkSync } from 'node:fs'

const TEST_DB = 'prisma/test.db'

beforeAll(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
  execSync(
    'npx prisma db push --url file:./prisma/test.db --accept-data-loss',
    { stdio: 'inherit' }
  )
})