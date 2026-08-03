import { prisma } from '@/lib/prisma'
import { updateTask } from '@/app/actions'
import { notFound } from 'next/navigation'

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

  return (
    <form action={updateWithId}>
      <label>
        Title
        <input name="title" type="text" defaultValue={task.title} required />
      </label>
      <label>
        Description
        <textarea name="description" defaultValue={task.description} />
      </label>
      <label>
        Due Date
        <input name="dueDate" type="date" defaultValue={dueDateValue} required />
      </label>
      <label>
        Topic
        <input name="topic" type="text" defaultValue={task.topic} required />
      </label>
      <label>
        Status
        <select name="status" defaultValue={task.status} required>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In-Progress</option>
          <option value="COMPLETE">Complete</option>
        </select>
      </label>
      <button type="submit">Save Changes</button>
    </form>
  )
}