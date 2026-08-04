import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { isOverdue } from '@/lib/task-helpers'
import type { Task } from '../../generated/prisma/client'

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

export default async function ArchivedPage() {
  const tasks = await prisma.task.findMany({
    where: { archived: true },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/" className="text-sm text-slate-500 hover:underline">
        ← Back to active tasks
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Archived Tasks</h1>

      <ul className="mt-6 space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-medium text-slate-700">{task.title}</h2>
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
              <p className="mt-1 text-sm text-slate-500">{task.description}</p>
            )}

            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span>Topic: {task.topic}</span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-500">
          No archived tasks.
        </p>
      )}
    </main>
  )
}