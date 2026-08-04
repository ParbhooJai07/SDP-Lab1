import { createTask } from '@/app/actions'
import Link from 'next/link'

export default function NewTaskPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <Link href="/" className="text-sm text-slate-500 hover:underline">
        ← Back to tasks
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">New Task</h1>

      <form action={createTask} className="mt-6 space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
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
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
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
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Create Task
        </button>
      </form>
    </main>
  )
}