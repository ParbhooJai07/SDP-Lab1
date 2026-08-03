import type { Task } from '../generated/prisma/client'

export function isOverdue(task: Pick<Task, 'dueDate' | 'status'>): boolean {
  return new Date(task.dueDate) < new Date() && task.status !== 'COMPLETE'
}