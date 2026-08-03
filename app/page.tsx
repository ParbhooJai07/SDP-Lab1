import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { isOverdue } from '@/lib/task-helpers'

export default async function Home() {
  const tasks = await prisma.task.findMany({
    where: { archived: false },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main>
      <h1>Tasks</h1>
      <Link href="/new">+ New Task</Link>

      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <strong>{task.title}</strong>
              {isOverdue(task) && <span style={{ color: 'red' }}> OVERDUE</span>}
              <div>{task.description}</div>
              <div>Topic: {task.topic}</div>
              <div>Status: {task.status}</div>
              <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
              <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}