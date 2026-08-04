import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { isOverdue } from '@/lib/task-helpers'
import type { Task } from '../generated/prisma/client'
import { archiveTask } from '@/app/actions'

const SORT_OPTIONS = ['topic', 'status', 'dueDate'] as const
type SortOption = (typeof SORT_OPTIONS)[number]

const STATUS_ORDER = { TODO: 0, IN_PROGRESS: 1, COMPLETE: 2 } as const

const STATUS_LABELS: Record<Task['status'], string> = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete',
}

const STATUS_STYLES: Record<Task['status'], string> = {
  TODO: 'bg-slate-100 text-slate-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-800',
  COMPLETE: 'bg-emerald-100 text-emerald-800',
}

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
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/new" className="font-medium text-blue-600 hover:underline">
            + New Task
          </Link>
          <Link href="/archived" className="text-slate-500 hover:underline">
            View Archived
          </Link>
        </div>
      </div>

      <nav className="mt-6 flex items-center gap-1 text-sm text-slate-500">
        <span className="mr-1">Sort by:</span>
        {SORT_OPTIONS.map((option) => (
          <Link
            key={option}
            href={`/?sort=${option}`}
            className={`rounded-full px-3 py-1 ${
              activeSort === option
                ? 'bg-slate-900 text-white'
                : 'hover:bg-slate-100'
            }`}
          >
            {option}
          </Link>
        ))}
      </nav>

      <ul className="mt-6 space-y-3">
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className="rounded-lg border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-medium text-slate-900">{task.title}</h2>
              <div className="flex shrink-0 items-center gap-2">
                {isOverdue(task) && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                    OVERDUE
                  </span>
                )}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[task.status]}`}
                >
                  {STATUS_LABELS[task.status]}
                </span>
              </div>
            </div>

            {task.description && (
              <p className="mt-1 text-sm text-slate-600">{task.description}</p>
            )}

            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span>Topic: {task.topic}</span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm">
              <Link href={`/tasks/${task.id}/edit`} className="text-blue-600 hover:underline">
                Edit
              </Link>
              <form action={archiveTask.bind(null, task.id)}>
                <button type="submit" className="text-slate-500 hover:text-slate-800 hover:underline">
                  Archive
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>

      {sortedTasks.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-500">
          No tasks yet. Create one to get started.
        </p>
      )}
    </main>
  )
}