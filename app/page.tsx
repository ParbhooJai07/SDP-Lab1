import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { isOverdue } from '@/lib/task-helpers'
import type { Task } from '../generated/prisma/client'

const SORT_OPTIONS = ['topic', 'status', 'dueDate'] as const
type SortOption = (typeof SORT_OPTIONS)[number]

const STATUS_ORDER = { TODO: 0, IN_PROGRESS: 1, COMPLETE: 2 } as const

function isValidSort(value: string | undefined): value is SortOption {
  return SORT_OPTIONS.includes(value as SortOption)
}

function sortTasks(tasks: Task[], sort: SortOption): Task[] {
  const sorted = [...tasks]

  if (sort === 'topic') {
    sorted.sort((a, b) => a.topic.localeCompare(b.topic))
  } else if (sort === 'status') {
    sorted.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
  } else {
    sorted.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
  }

  return sorted
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const { sort } = await searchParams
  const activeSort: SortOption = isValidSort(sort) ? sort : 'dueDate'

  const tasks = await prisma.task.findMany({
    where: { archived: false },
  })

  const sortedTasks = sortTasks(tasks, activeSort)

  return (
    <main>
      <h1>Tasks</h1>
      <Link href="/new">+ New Task</Link>

      <nav>
        Sort by:{' '}
        {SORT_OPTIONS.map((option) => (
          <Link
            key={option}
            href={`/?sort=${option}`}
            style={{ fontWeight: activeSort === option ? 'bold' : 'normal' }}
          >
            {option}
          </Link>
        ))}
      </nav>

      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            {isOverdue(task) && <span style={{ color: 'red' }}> OVERDUE</span>}
            <div>{task.description}</div>
            <div>Topic: {task.topic}</div>
            <div>Status: {task.status}</div>
            <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
            <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}