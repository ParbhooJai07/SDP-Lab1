'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { Status } from '../generated/prisma/client'

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const dueDate = formData.get('dueDate') as string
  const topic = formData.get('topic') as string

  if (!title || !dueDate || !topic) {
    throw new Error('Title, due date and topic are required')
  }

  await prisma.task.create({
    data: {
      title,
      description: description || '',
      dueDate: new Date(dueDate),
      topic,
    },
  })

  revalidatePath('/')
  redirect('/')
}

export async function updateTask(id: number, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const dueDate = formData.get('dueDate') as string
  const topic = formData.get('topic') as string
  const status = formData.get('status') as Status

  if (!title || !dueDate || !topic || !status) {
    throw new Error('Title, due date, topic and status are required')
  }

  await prisma.task.update({
    where: { id },
    data: {
      title,
      description: description || '',
      dueDate: new Date(dueDate),
      topic,
      status,
    },
  })

  revalidatePath('/')
  redirect('/')
}

export async function archiveTask(id: number) {
  await prisma.task.update({
    where: { id },
    data: { archived: true },
  })

  revalidatePath('/')
  revalidatePath('/archived')
}