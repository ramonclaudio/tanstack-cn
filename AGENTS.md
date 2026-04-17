# AGENTS.md

Guidance for AI coding agents working in this repository. Complements the README.

## Project

TanStack Start starter on the latest majors. Vite 8 Rolldown+Oxc, Tailwind v4 + shadcn `base-luma` on `@base-ui/react`, Oxlint + Oxfmt. React 19, TypeScript 6, Vitest 4. Bun runtime. Deploys anywhere Nitro runs.

## Conventions

- **Style**: Small functions (<50 lines). Early returns. No deep nesting. Strict TypeScript. No dead code.
- **Commits**: Conventional commits. `type(scope): lowercase description`, <72 chars, no trailing period. Verbs: add, fix, extract, drop, rename, move, split, wire, swap. Never: implement, leverage, utilize, streamline, enhance.
- **Voice**: Terse, direct, specific. No emdashes. No hedging. No rule-of-three patterns. No marketing copy in commits, PRs, or docs.
- **Destructive ops**: Never `rm`, `rmdir`, `dd`, `find -delete`, `> file` truncation. Use `trash` (Ray's global policy).
- **Attribution**: Never attribute Claude, Anthropic, Claude Code, or AI in authored content (commits, PRs, docs, code comments).

## Stack rules

- **Base UI not Radix**: Primitives come from `@base-ui/react`. If a shadcn component references Radix, swap to the Base UI equivalent.
- **Oxlint + Oxfmt, not ESLint or Prettier**: Never add `.prettierrc`, `eslint.config.js`, or related packages. Use `bun run lint:fix` / `bun run fmt`.
- **base-luma theme**: Pinned in `components.json`. `bunx shadcn@latest add <name>` picks it up automatically.
- **Bun**: Package manager and runtime. Use `bun add` / `bun remove`, not npm/pnpm/yarn.

## Before making changes

1. Read `CLAUDE.md` / `AGENTS.md` (this file) and `README.md`.
2. Run `bun run typecheck && bun run test` to confirm the baseline is green.
3. Check the five CI gates pass locally: typecheck, lint, fmt:check, test, build.

## Key files

| File                                | Purpose                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/routes/__root.tsx`             | Root layout, head (meta + OG + JSON-LD + speculation rules), theme, Toaster, skip link                       |
| `src/routes/index.tsx`              | Showcase homepage                                                                                            |
| `src/lib/site.ts`                   | Single source of truth for `SITE_URL`, `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`, `AUTHOR_*`, `REPO_URL` |
| `src/lib/seo.ts`                    | Head meta helper (og, twitter, canonical, image). Absolute URLs for social scrapers.                         |
| `src/components/theme-provider.tsx` | Light/dark/system with no-flash inline script                                                                |
| `src/styles.css`                    | Tailwind v4 + base-luma + `prefers-reduced-motion`                                                           |
| `vite.config.ts`                    | Vite 8 + Nitro SSR + `routeRules` security headers                                                           |

## Common tasks

- **Add a shadcn component**: `bunx shadcn@latest add <name>`. Lands in `src/components/ui/` with base-luma styling.
- **Add a new route**: Create `src/routes/<name>.tsx` with `createFileRoute`. TanStack Router regenerates `routeTree.gen.ts` on save.
- **Add a server function**: Use `createServerFn` from `@tanstack/react-start`. Server functions run only on the server and can be called from the client.
- **Change site metadata**: Edit `src/lib/site.ts`. Consumed by `src/lib/seo.ts` and `src/routes/__root.tsx`.
- **Change security headers**: Edit `securityHeaders` in `vite.config.ts`. Nitro emits them on every preset (Vercel, Cloudflare, Netlify, Node, Bun).

## Not appropriate

- Adding Radix, ESLint, Prettier, or Biome.
- Adding vendor-specific deps like `@vercel/*` or `@cloudflare/*` to runtime. Keep the starter platform-neutral.
- Committing `.env`, `node_modules/`, `.output/`, `.nitro/`, or other generated artifacts.
- Using emojis in code, commits, or docs unless the user explicitly requests them.
- Creating README / CHANGELOG / docs files the user did not ask for.
