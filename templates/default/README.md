# tanstack-cn app

Scaffolded from [`create-tanstack-cn`](https://github.com/ramonclaudio/tanstack-cn). TanStack Start on Vite 8 + Oxc, Tailwind v4 + shadcn `base-luma` on Base UI. Oxlint + Oxfmt. React 19, TypeScript 6, Vitest 4. Use any PM: npm, pnpm, bun, or yarn.

```bash
npm run dev    # or pnpm dev, bun run dev, yarn dev
```

Dev server on `http://localhost:3000`.

## What's wired

### Launch baseline

- Nitro `routeRules` in `vite.config.ts` emit security headers on every preset: `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` (camera, mic, geolocation off), `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Origin-Agent-Cluster`
- TanStack Router `defaultPreload: "intent"`: hover prefetches the route's JS chunk and loader data
- Top header bar with home icon and theme toggle. Semantic `<header>` + `<main id="main">`, working skip link, `prefers-reduced-motion` respected globally

### SEO and social

- `src/lib/seo.ts`: absolute `og:image`, `og:url`, `og:image:width/height`, `twitter:card` auto-promotion
- Canonical link, `og:site_name`, full Twitter meta, JSON-LD `@graph` (`WebSite` + `SoftwareSourceCode` + `Person`)
- OG image: 2400×1260 PNG (2x of 1200×630), under 500KB, unfurls on X, Facebook, LinkedIn, Discord, Slack, iMessage
- `public/sitemap.xml`, `public/robots.txt` with AI training crawler opt-outs (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, Bytespider, meta-externalagent)
- `public/.well-known/security.txt` per RFC 9116
- `public/llms.txt` + `public/llms-full.txt`

### PWA + icons

- `favicon.svg` primary + multi-size `favicon.ico` fallback, `apple-touch-icon.png` (180×180)
- `manifest.webmanifest` with `any`, `maskable`, `monochrome` icons + wide/narrow screenshots
- `theme-color` per scheme via `media` queries, `color-scheme`, `mobile-web-app-capable`

## Scripts

```
dev                            Vite 8 dev server with HMR on :3000
build                          vite build && tsc --noEmit
start                          Nitro SSR server from .output/
preview                        vite preview
typecheck                      tsc --noEmit
lint                           oxlint
lint:fix                       oxlint --fix (safe fixes only)
lint:fix:suggest               oxlint --fix --fix-suggestions
lint:fix:dangerous             oxlint --fix --fix-suggestions --fix-dangerously
fmt                            oxfmt
fmt:check                      oxfmt --check
test                           vitest run
test:watch                     vitest
clean                          trash artifacts, reinstall, fmt, lint --fix, build, typecheck, test
```

Invoke with your package manager: `npm run <name>`, `pnpm <name>`, `bun run <name>`, or `yarn <name>`. The `clean` script auto-detects which one and reinstalls accordingly.

## Adding shadcn components

```bash
npx shadcn@latest add sheet dialog tabs
# or: pnpm dlx, bunx, yarn dlx
```

Components land in `src/components/ui/`. Import via the `@/` alias:

```tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
```

`base-luma` is pinned in `components.json`, so every new component picks it up.

## Customize for your project

The scaffolder rewrote `package.json` `name` and `wrangler.toml` `name` for you. Everything else still references this template's metadata. Update before you deploy:

**Project metadata** (`src/lib/site.ts`):

```
SITE_URL          # canonical URL, og:url, sitemap entries
SITE_NAME         # used in <title> suffix and OG site name
SITE_TITLE        # default page title
SITE_DESCRIPTION  # meta description, OG description
AUTHOR_NAME, AUTHOR_URL, REPO_URL
```

**Package metadata** (`package.json`):

```
description, author, homepage, repository, bugs, keywords
```

**SEO files**:

- `public/robots.txt` — `Sitemap:` line
- `public/sitemap.xml` — `<loc>` entries
- `public/.well-known/security.txt` — `Contact:` and `Canonical:`

**Find anything missed**:

```bash
grep -r "ramonclaudio/tanstack-cn\|tanstack-cn.vercel.app" -l --exclude-dir=node_modules
```

## Site URL on production

`src/lib/site.ts` reads `import.meta.env.VITE_SITE_URL` with a hardcoded fallback. Two ways to set it for production:

1. **Edit `src/lib/site.ts`** — change the fallback to your domain. Simplest, no env var needed.
2. **Set `VITE_SITE_URL` in your platform's env vars** — keeps the source untouched, lets each environment (preview, production) override independently.

If you skip both, SEO meta will point at `localhost`. Search engines and social cards will be wrong.

## Project structure

```
.
├── .vscode/
│   └── settings.json                # routeTree.gen.ts readonly + excluded from search/watcher
├── patches/                         # *.patch files applied to node_modules via postinstall
├── scripts/
│   ├── _run.mjs                     # runtime-agnostic launcher (bun -> tsx -> npx tsx)
│   ├── apply-patches.mjs            # postinstall: applies patches/*.patch via git apply
│   └── clean.ts                     # PM-agnostic full reset + fix + verify chain
└── src/
    ├── components/
    │   ├── default-catch-boundary.tsx   # router error boundary
    │   ├── devtools.tsx                 # TanStack devtools (dev only)
    │   ├── not-found.tsx                # 404 page
    │   ├── theme-provider.tsx           # light/dark/system with no-flash script
    │   ├── theme-toggle.tsx             # dropdown toggle using HugeIcons
    │   ├── web-vitals.tsx               # CLS/FID/LCP/INP reporter
    │   └── ui/                          # shadcn/ui base-luma primitives
    ├── lib/
    │   ├── report-web-vitals.ts
    │   ├── seo.ts                       # head meta helper
    │   ├── site.ts                      # SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION
    │   ├── utils.ts                     # cn() class merger
    │   └── *.test.ts
    ├── routes/
    │   ├── __root.tsx                   # shellComponent: html/body shell, header bar, theme, Toaster
    │   └── index.tsx                    # demo homepage
    ├── router.tsx
    ├── routeTree.gen.ts                 # auto-generated by TanStack Router
    ├── styles.css                       # Tailwind v4 + base-luma + reduced-motion
    └── vite-env.d.ts                    # typed import.meta.env
```

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and every PR. For each of `bun`, `pnpm`, `npm`, `yarn`: install, typecheck, lint, fmt:check, test, build. Any failure on any PM blocks merge. Deploy success is verified by each platform's native check (Vercel commit status, Cloudflare Workers Builds).

## Deploying

Nitro auto-detects the platform from build env (`VERCEL`, `NETLIFY`, Cloudflare Workers) and emits the right output. Security headers ship from `routeRules` in `vite.config.ts`. `VITE_SITE_URL` is build-time, so set it in the platform's env vars before deploys.

Run locally:

```bash
npm run build
npm run start   # Node SSR from .output/
```

### Vercel

Ships `vercel.json`. Deploy via [vercel.com/new](https://vercel.com/new) (import repo, add `VITE_SITE_URL` under Project Settings → Environment Variables) or:

```bash
npx vercel link
npx vercel --prod
npx vercel env add VITE_SITE_URL production
```

### Netlify

Ships `netlify.toml`. Deploy via [app.netlify.com/start](https://app.netlify.com/start) (connect repo, add `VITE_SITE_URL` under Site Settings → Environment Variables) or:

```bash
npx netlify init
npx netlify deploy --prod
npx netlify env:set VITE_SITE_URL https://yourdomain.com --context production
```

### Cloudflare Workers

Ships `wrangler.toml`. Workers + Static Assets, not Pages (Pages reserves the `ASSETS` binding Nitro needs). Deploy via [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Workers (connect repo, set Build command `npm run build` and Deploy command `npx wrangler deploy`, add `VITE_SITE_URL` under Variables and Secrets) or:

```bash
npx wrangler login
VITE_SITE_URL=https://yourdomain.com npm run build
npx wrangler deploy
```

### Other platforms

Anywhere Nitro runs: Node, Bun, AWS Lambda, Deno Deploy, etc. Set `NITRO_PRESET` (e.g. `NITRO_PRESET=node-server`) and run `npm run build`. Output lands in `.output/`.

Full docs: [`ramonclaudio/tanstack-cn`](https://github.com/ramonclaudio/tanstack-cn).

## License

MIT.
