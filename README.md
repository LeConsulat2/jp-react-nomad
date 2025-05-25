---
# JP React Nomad

A modern, full-stack, type-safe SaaS starter built with **React Router**, **TypeScript**, **Supabase**, **OpenAI**, **Sentry**, **Cloudflare**, and **Drizzle ORM**.
This project is modular, scalable, and production-ready, following best practices for code structure, error monitoring, and cloud-native deployment.
---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database & Migrations](#database--migrations)
- [Cloud & Integrations](#cloud--integrations)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Conventions](#conventions)
- [License](#license)

---

## Features

- **Authentication**: Supabase Auth (email, OAuth, JWT)
- **User Profiles**: Role-based, with avatars, bios, and stats
- **Products & Reviews**: CRUD, upvotes, categories, and reviews
- **Ideas & AI**: OpenAI-powered idea generation, claiming, and tracking
- **Teams & Jobs**: Team management, job boards, and applications
- **Community**: Posts, replies, notifications, and upvotes
- **Messaging**: Real-time chat with message rooms
- **Analytics**: Dashboard, stats, and notifications
- **Admin**: Role management, moderation, and audit logs
- **Error Monitoring**: Sentry integration for both client and server
- **Cloudflare**: (If used) Edge deployment, caching, and DNS
- **Cron Jobs**: (If used) Automated scheduled tasks (see `/app/sql/functions/` or `/app/sql/triggers/`)
- **Type Safety**: End-to-end with TypeScript, Zod, and Drizzle ORM
- **UI/UX**: Shadcn UI, Radix, Tailwind CSS, and custom components

---

## Tech Stack

- **Frontend**: React 18, React Router 7, TypeScript, Shadcn UI, Radix, Tailwind CSS
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions), Drizzle ORM
- **AI**: OpenAI GPT-4o (via `openai` npm package)
- **Monitoring**: Sentry (`@sentry/react-router`)
- **Cloud**: Cloudflare (optional), Vercel/Netlify (optional)
- **Dev Tools**: Vite, ESLint, Prettier, Drizzle Kit, Cursor

---

## Project Structure

```
.
├── app/
│   ├── features/         # Modular feature folders (users, products, ideas, etc.)
│   ├── common/           # Shared UI components (Shadcn, Radix, etc.)
│   ├── sql/              # Migrations, views, triggers, seeds
│   ├── supa-client.ts    # Supabase client (browser/server)
│   ├── root.tsx          # Root React component
│   ├── routes.ts         # Route definitions
│   └── ...
├── components/           # Global UI components
├── public/               # Static assets
├── database.types.ts     # Supabase-generated types
├── drizzle.config.ts     # Drizzle ORM config
├── package.json
├── vite.config.ts
├── .cursorrules          # Custom code conventions
└── README.md
```

---

## Environment Variables

Set these in your `.env` file (see [Supabase docs](https://supabase.com/docs/guides/api)):

```env
# Supabase
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# OpenAI
OPENAI_API_KEY=...

# Sentry
SENTRY_AUTH_TOKEN=...
SENTRY_DSN=...

# Cloudflare (if used)
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=...
```

---

## Database & Migrations

- **Drizzle ORM** is used for schema, migrations, and type safety.
- **Supabase** is the Postgres backend.
- **Migrations**:
  - Generate: `npm run db:generate`
  - Apply: `npm run db:migrate`
- **Seed data**:
  - `app/sql/seed.sql`
- **Views, triggers, functions**:
  - `app/sql/views/`, `app/sql/triggers/`, `app/sql/functions/`
- **Manual SQL**:
  - You can also run SQL directly in the Supabase SQL Editor, but always prefer migrations for reproducibility.

---

## Cloud & Integrations

- **Sentry**: Error monitoring for both client and server.
  - Configured in `vite.config.ts` and `react-router.config.ts`.
- **Supabase**: Auth, DB, Storage, Edge Functions.
- **OpenAI**: Used for AI-powered features (see `app/features/ideas/pages/generate-idea-page.tsx`).
- **Cloudflare**: (If used) for edge deployment, DNS, and caching.
- **Cron Jobs**: (If used) see `/app/sql/functions/` and `/app/sql/triggers/` for scheduled tasks.

---

## Development

```sh
# Install dependencies
npm install

# Generate DB types (if needed)
npm run db:typegen

# Run dev server (use cross-env for Windows compatibility)
npm run dev
# or, for Windows PowerShell:
$env:NODE_OPTIONS="--import ./instrument.server.mjs"
npm run dev
```

---

## Testing

- **Unit/Integration tests**: (add your preferred framework, e.g., Vitest, Jest)
- **E2E tests**: (add Playwright/Cypress if used)
- **Linting**: `npm run lint`
- **Type checking**: `npm run typecheck`

---

## Deployment

- **Vercel/Netlify/Cloudflare**:
  - Set all environment variables in your deployment dashboard.
  - Run migrations before first deploy.
- **Supabase**:
  - Project URL and keys from [Supabase dashboard](https://supabase.com/dashboard/project/_/settings/api)
- **Sentry**:
  - Set up DSN and auth token in your deployment environment.

---

## Conventions

- **TypeScript everywhere**; prefer interfaces over types.
- **Functional, declarative React**; no classes.
- **Directory naming**: `lowercase-with-dashes`
- **Component structure**:
  - Exported component, subcomponents, helpers, static content, types.
- **UI**:
  - Use Shadcn UI, Radix, Tailwind.
  - Do not import directly from Radix; always use Shadcn UI.
- **Remix/React Router**:
  - Use `react-router` imports, not `@remix-run`.
  - Loader/action/meta conventions as in `.cursorrules`.
- **Supabase**:
  - Use `supa-client.ts` for all client/server DB access.
- **Error monitoring**:
  - Sentry is integrated for both build and runtime errors.

See `.cursorrules` for more details.

---

## License

MIT

---

**For more details, see the codebase and `.cursorrules`.  
If you have questions, open an issue or contact the maintainer.**

---

Let me know if you want this as a file or want to customize any section!
