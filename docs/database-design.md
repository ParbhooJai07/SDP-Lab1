# Database Design

## Overview

The application uses a single SQLite database file (`prisma/dev.db`), accessed
through Prisma ORM with the `@prisma/adapter-better-sqlite3` driver adapter.
There is one table, `Task`, since the application has no user accounts and no
other entities to relate it to.

## Schema

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  dueDate     DateTime
  topic       String
  status      Status   @default(TODO)
  archived    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  TODO
  IN_PROGRESS
  COMPLETE
}
```

## Column notes

| Column | Type | Purpose |
|---|---|---|
| `id` | `Int`, auto-increment | Primary key. |
| `title` | `String` | Required task field from the brief. |
| `description` | `String` | Required task field from the brief. |
| `dueDate` | `DateTime` | Required task field from the brief; used both for display and to derive overdue status at read time. |
| `topic` | `String` | Required task field from the brief; also the sort key for "sort by topic". |
| `status` | `Status` enum | One of `TODO`, `IN_PROGRESS`, `COMPLETE`. Fixed and not user-customisable, per the brief. |
| `archived` | `Boolean` | Flag used instead of deletion. Archived tasks (`archived = true`) are excluded from the main list query but remain queryable and viewable on a separate `/archived` page. |
| `createdAt` / `updatedAt` | `DateTime` | Standard audit timestamps; `updatedAt` is also used to order the archived list by most recently archived. |

## Design decisions

- **No `overdue` column.** Whether a task is overdue is derived at read
  time from `dueDate` and `status` (`dueDate < now() && status !== 'COMPLETE'`),
  in `lib/task-helpers.ts`. This keeps overdue-ness always correct relative to
  the current time without needing a background job or write to update it, and
  keeps it clearly separate from the fixed `status` enum, matching the brief's
  requirement that overdue not be a selectable status.
- **Archiving is a flag, not a delete or a copy.** Setting `archived = true`
  on the existing row satisfies "cannot be deleted, only archived, so that it
  remains viewable" without needing a second table or duplicate data.
- **No relationships / no other tables.** The application has a single
  implicit user and a single entity (`Task`), so there is nothing to
  normalise into a separate table — topics and statuses are attributes on the
  task itself rather than foreign keys to lookup tables, since neither is
  user-extensible.

## Migrations

Schema changes are tracked as Prisma migrations under `prisma/migrations/`,
generated with `npx prisma migrate dev`. A clean clone reproduces the schema
by running:

```bash
npx prisma migrate deploy
```

(see `Running It` for the full setup sequence).

## AI Declaration

This document was drafted with assistance from Claude-Web [Claude Sonnet 5]. The author reviewed and edited the final content.