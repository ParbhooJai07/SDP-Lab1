'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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