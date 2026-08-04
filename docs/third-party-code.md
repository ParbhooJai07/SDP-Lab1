# Third-Party Code

| Package | Why it was chosen |
|---|---|
| `next` | Framework required by the brief; App Router gives server actions and server components, which removed the need for a separate API layer for CRUD operations. |
| `react` / `react-dom` | Required peer dependencies of Next.js. |
| `typescript` | Static typing on task fields (status enum, dates) catches mismatches between the form, server actions and schema at compile time rather than at runtime. |
| `prisma` | Provides a typed query layer and tracked schema migrations over raw SQL, which keeps the database schema and the TypeScript types in sync automatically. |
| `@prisma/client` | Generated, type-safe client used to read/write tasks from the app and from tests. |
| `@prisma/adapter-better-sqlite3` | Required by Prisma 7, which removed its built-in query engine in favour of driver adapters — this adapter connects Prisma to a local SQLite file. |
| `better-sqlite3` | Synchronous, embedded SQLite driver for Node — no separate database server needed, matching the brief's local-first requirement. |
| `tailwindcss` / `@tailwindcss/postcss` | Utility-first CSS, chosen at project scaffolding for fast styling without writing separate stylesheet files. |
| `vitest` | Test runner; chosen over Jest for faster startup and native TypeScript/ESM support with minimal configuration. |
| `eslint` / `eslint-config-next` | Default linting from `create-next-app`, kept to catch common mistakes during development. |
| `@types/node`, `@types/react`, `@types/react-dom`, `@types/better-sqlite3` | TypeScript type definitions for packages that don't ship their own types, required for type-checking to work correctly. |

## AI Declaration

This document was drafted with assistance from Claude-Web [Claude Sonnet 5]. The author reviewed and edited the final content.