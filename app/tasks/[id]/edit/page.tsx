import { prisma } from '@/lib/prisma'
import { updateTask } from '@/app/actions'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const task = await prisma.task.findUnique({ where: { id: Number(id) } })

  if (!task) notFound()

  const updateWithId = updateTask.bind(null, task.id)

  // Format date for the <input type="date"> value (needs YYYY-MM-DD)
  const dueDateValue = new Date(task.dueDate).toISOString().split('T')[0]

  const inputClasses =
    'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500'

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <Link href="/" className="text-sm text-slate-500 hover:underline">
        ← Back to tasks
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Edit Task</h1>

      <form action={updateWithId} className="mt-6 space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={task.title}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={task.description}
            rows={4}
            className={inputClasses}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              defaultValue={dueDateValue}
              required
              className={inputClasses}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">
              Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              defaultValue={task.topic}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
            required
            className={inputClasses}
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In-Progress</option>
            <option value="COMPLETE">Complete</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Save Changes
        </button>
      </form>
    </main>
  )
}