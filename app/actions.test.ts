import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/test.db' })
const prisma = new PrismaClient({ adapter })

describe('task archiving', () => {
  beforeEach(async () => {
    await prisma.task.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('archives a task so it no longer appears in the active list', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'Test task',
        description: 'desc',
        dueDate: new Date(),
        topic: 'Testing',
      },
    })

    await prisma.task.update({
      where: { id: task.id },
      data: { archived: true },
    })

    const active = await prisma.task.findMany({ where: { archived: false } })
    const archived = await prisma.task.findMany({ where: { archived: true } })

    expect(active.find((t) => t.id === task.id)).toBeUndefined()
    expect(archived.find((t) => t.id === task.id)).toBeDefined()
  })
})