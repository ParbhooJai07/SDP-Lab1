# SDP Lab 1 — Todo Application

A local-first todo application built with Next.js and SQLite. There are no
user accounts — the app runs entirely on one machine via Node.js.

## Requirements

- **Node.js v24.14.0** (or any current LTS release). Verify with:
```bash
  node -v
```

## Install

From a clean clone:

```bash
git clone <repository-url>
cd SDP-Lab1
```

Copy the environment template (creates the `DATABASE_URL` the app needs):

```bash
copy .env.example .env
```
*(macOS/Linux: `cp .env.example .env`)*

Install dependencies:

```bash
npm install
```

> **Windows troubleshooting:** installing dependencies compiles a native
> SQLite binding (`better-sqlite3`) if no prebuilt binary matches your
> platform. If `npm install` fails with a `node-gyp` / `find VS` error,
> install **Build Tools for Visual Studio** with the
> **"Desktop development with C++"** workload from
> https://visualstudio.microsoft.com/downloads/, then re-run `npm install`.

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply the database schema:

```bash
npx prisma migrate deploy
```

## Run

```bash
npm run dev
```

The app is available at http://localhost:3000. It starts with an empty task
list — this is expected, since the database was just created.

## Test

```bash
npm test
```

Runs the full test suite against a disposable SQLite database at
`prisma/test.db`, created fresh on each run. This does not affect
`prisma/dev.db` and requires no manual setup beyond the install steps above.

## Stopping and restarting

Stop the dev server with `Ctrl+C`. Data persists in `prisma/dev.db`, so
running `npm run dev` again shows the same tasks as before.

## Documentation

- [Third-Party Code](docs/third-party-code.md)
- [Database Design](docs/database-design.md)
- [Running It](docs/running-it.md)

## AI Declaration

This repository contains code that was developed with the assistance of generative Artificial Intelligence tools
This document was drafted with assistance from Claude-Web [Claude Sonnet 5]. The author reviewed and edited the final content.