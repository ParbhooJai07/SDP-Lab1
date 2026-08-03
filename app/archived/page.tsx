import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { isOverdue } from '@/lib/task-helpers'

export default async function ArchivedPage() {
  const tasks = await prisma.task.findMany({
    where: { archived: true },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <main>
      <h1>Archived Tasks</h1>
      <Link href="/">← Back to active tasks</Link>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            {isOverdue(task) && <span style={{ color: 'red' }}> OVERDUE</span>}
            <div>{task.description}</div>
            <div>Topic: {task.topic}</div>
            <div>Status: {task.status}</div>
            <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}