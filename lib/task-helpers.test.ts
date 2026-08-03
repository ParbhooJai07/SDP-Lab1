import { describe, it, expect } from 'vitest'
import { isOverdue } from './task-helpers'

describe('isOverdue', () => {
  it('returns true for a past due date with status not COMPLETE', () => {
    const task = { dueDate: new Date('2020-01-01'), status: 'TODO' as const }
    expect(isOverdue(task)).toBe(true)
  })

  it('returns false for a past due date if status is COMPLETE', () => {
    const task = { dueDate: new Date('2020-01-01'), status: 'COMPLETE' as const }
    expect(isOverdue(task)).toBe(false)
  })

  it('returns false for a future due date', () => {
    const task = { dueDate: new Date('2099-01-01'), status: 'TODO' as const }
    expect(isOverdue(task)).toBe(false)
  })
})