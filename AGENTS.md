<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview

Chorba UI is a Next.js 16 App Router application for turning recipe URLs into clean cooking guides. The landing page submits a URL to the shareable `/recipe?url=...` route, which fetches recipe data server-side from the Chorba API configured by `CHORBA_API_URL`.

Key areas:
- `app/`: Next.js routes, layout, and global CSS.
- `components/`: Shared UI and recipe presentation components.
- `lib/`: API client, URL validation, and recipe types.
- `test/setup.ts` and `vitest.config.ts`: test environment setup.

## Build And Test Commands

- `npm run dev`: start the local development server.
- `npm test`: run the Vitest test suite once.
- `npm run lint`: run ESLint.
- `npm run build`: run the production Next.js build and TypeScript checks.

Before considering implementation complete, run `npm test`, `npm run lint`, and `npm run build`.

## Code Style Guidelines

- Use TypeScript and keep `strict` compatibility.
- Use the `@/*` import alias for project-root imports.
- Prefer Server Components by default. Add `"use client"` only for components that need state, effects, event handlers, browser APIs, or custom client hooks.
- Keep server-only API code in `lib/` and guard it with `import "server-only"` when it must not enter the browser bundle.
- Keep components focused and small. Avoid broad refactors unrelated to the current task.
- Use Tailwind CSS 4 tokens from `app/globals.css`; avoid redefining generic token names such as `--spacing-xl` that can collide with built-in Tailwind utility namespaces.
- Use inline SVG components from `components/icons.tsx` rather than external icon fonts.
- Do not fabricate recipe fields that are absent from the API. Omit unavailable optional data instead.

## Testing Instructions

- Use Vitest and React Testing Library for unit and component tests.
- Place focused tests beside the code they cover when practical.
- For behavior changes, write or update a failing test first, then implement the minimal fix.
- Cover URL validation, API response normalization, highlight rendering, ingredient checklist behavior, conditional media/video UI, and mobile FAB behavior when touched.
- Prefer assertions based on accessible roles, labels, text, and user-observable behavior rather than implementation details.
