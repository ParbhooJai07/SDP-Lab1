import { createTask } from '@/app/actions'

export default function NewTaskPage() {
  return (
    <form action={createTask}>
      <label>
        Title
        <input name="title" type="text" required />
      </label>
      <label>
        Description
        <textarea name="description" />
      </label>
      <label>
        Due Date
        <input name="dueDate" type="date" required />
      </label>
      <label>
        Topic
        <input name="topic" type="text" required />
      </label>
      <button type="submit">Create Task</button>
    </form>
  )
}