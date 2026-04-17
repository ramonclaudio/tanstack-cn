# tanstack-cn

![tanstack-cn](templates/default/public/og.png)

TanStack Start starter on the latest majors. Vite 8 Rolldown+Oxc, Tailwind v4 + shadcn/ui `base-luma` on Base UI, Oxlint+Oxfmt. No Radix, no ESLint, no Prettier.

[Live demo](https://tanstack-cn.vercel.app) · [Use this template](https://github.com/ramonclaudio/tanstack-cn/generate)

## Scaffold

```bash
bunx create-tanstack-cn@latest my-app
# or
npm create tanstack-cn@latest my-app
# or clone the template directly:
bunx degit ramonclaudio/tanstack-cn/templates/default my-app
```

`bunx tanstack-cn` prints the same instructions and exits.

The CLI copies the template, rewrites `package.json`, installs dependencies with the detected package manager (bun / pnpm / yarn / npm), and initializes a git repo with an initial commit. Flags: `-y`, `--no-install`, `--no-git`.

## Why this exists

Every TanStack Start + shadcn starter on GitHub ships last year's choices: Radix, ESLint, Prettier, Webpack-era Vite. This one doesn't. Latest majors across the board, SEO and security plumbing wired, nothing to strip out.

## Stack

- TanStack Start + TanStack Router with file-based routing
- Vite 8 with Rolldown and Oxc plugins
- Nitro 3 for SSR output
- React 19 with the automatic JSX transform
- TypeScript 6, `strict`, `verbatimModuleSyntax`
- Tailwind CSS v4 via `@tailwindcss/vite`
- shadcn/ui `base-luma` theme on `@base-ui/react` (not Radix)
- HugeIcons + Geist Variable font
- Oxlint 1.59 with 232 rules across 8 native plugins, type-aware via `oxlint-tsgolint`
- Oxfmt with native import sorting, Tailwind class sorting, package.json field sorting
- Vitest 4 + `@testing-library/react` + jsdom
- Sonner toasts, theme provider, web vitals reporter
- Bun as runtime and package manager

## What's wired

### UI and routing

- `/` demo route that exercises Button, Card, Alert, InputGroup, Kbd, Empty, Separator, Sonner
- Light/dark/system theme with no-flash script in `templates/default/src/components/theme-provider.tsx`
- Error boundary and 404 route hooked into the root

### SEO and social

- `templates/default/src/lib/seo.ts` helper: absolute og:image, og:url, og:image:width/height, twitter:card auto-promotion
- Canonical link, `og:site_name`, full Twitter meta, JSON-LD `@graph` (WebSite + SoftwareSourceCode + Person)
- OG image: 2400×1260 PNG (2x of 1200×630). Retina-crisp, under 500KB, unfurls on X, Facebook, LinkedIn, Discord, Slack, iMessage
- `public/sitemap.xml`, `public/robots.txt` with AI training crawler opt-outs (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, Bytespider, meta-externalagent, etc.)

### Icons and PWA

- `favicon.svg` (primary) + multi-size `favicon.ico` fallback
- `apple-touch-icon.png` (180×180)
- `manifest.webmanifest` with separate `any`, `maskable`, and `monochrome` icons, plus wide + narrow screenshots and shortcuts
- `theme-color` with per-scheme `media` queries (bypasses TanStack head dedup by rendering in root JSX)
- `color-scheme`, `mobile-web-app-capable`, `apple-mobile-web-app-title`

### Launch baseline

- Nitro `routeRules` in `vite.config.ts` emit platform-agnostic security headers on every preset (Vercel, Cloudflare, Netlify, Node, Bun): `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` (camera/mic/geo/browsing-topics/interest-cohort off), `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Origin-Agent-Cluster`
- Speculation Rules API: internal links prerender on 200ms hover (instant nav)
- Skip link, `<main id="main">` landmark, `prefers-reduced-motion` respected globally
- `public/.well-known/security.txt` per RFC 9116
- `public/llms.txt` + `public/llms-full.txt` for Claude, Perplexity, ChatGPT Search
- `env.example` documenting the `VITE_SITE_URL` pattern, typed via `src/vite-env.d.ts`
- GitHub Actions CI: typecheck, lint, fmt:check, test, build
- Dependabot weekly grouped updates (TanStack, Base UI, HugeIcons, testing, oxc, react, tailwind, dev-tools)

## Repo layout

```
tanstack-cn/
├── packages/
│   ├── create-tanstack-cn/   # published as `create-tanstack-cn`, scaffolder CLI
│   └── tanstack-cn/          # published as `tanstack-cn`, redirect CLI
└── templates/
    └── default/              # the starter code the CLI scaffolds
```

| Package | Purpose |
| --- | --- |
| [`create-tanstack-cn`](packages/create-tanstack-cn) | Interactive scaffolder. Use via `bunx create-tanstack-cn@latest my-app`. |
| [`tanstack-cn`](packages/tanstack-cn) | Name reservation. `bunx tanstack-cn` prints install instructions and exits. |
| [`templates/default`](templates/default) | The starter that ships. Full scaffold-level README lives there. |

## Lighthouse (desktop, 5-run p50)

| Metric | Score |
| --- | --- |
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | 842ms |
| FCP | 842ms |
| CLS | 0.000 |
| TBT | 0ms |

## Development

```bash
bun install                   # install monorepo workspaces
bun run build                 # build both packages
bun run typecheck             # typecheck both packages
bun run template:dev          # run the template locally on :3000
bun run template:test         # run the template test suite
```

### Testing the CLI locally

```bash
cd packages/create-tanstack-cn
bun run build
node dist/index.js /tmp/scratch-app
```

## Release

Packages publish via tag push. Bump `packages/*/package.json` versions to match the tag, commit, tag, push:

```bash
git tag v0.2.0
git push --follow-tags
```

`.github/workflows/publish.yml` validates that both package versions match the tag, builds, and publishes both with OIDC provenance. Requires the `NPM_TOKEN` repo secret.

## License

MIT © [Ramon Claudio](https://github.com/ramonclaudio)
