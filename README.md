# tanstack-cn

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

I wanted a TanStack Start + shadcn template I could scaffold and use every time I start a new project, so I made this. On the latest stack with dark mode, OG meta, JSON-LD, security headers, PWA manifest, llms.txt, and all the launch boilerplate wired in. Vite 8 (Rolldown + Oxc) + Tailwind v4 + shadcn/ui `base-luma` on Base UI + React 19 + TypeScript 6 + Vitest 4 + Bun. Lighthouse 100/100/100/100. Live demo at [tanstack-cn.vercel.app](https://tanstack-cn.vercel.app). On npm as [`create-tanstack-cn`](https://www.npmjs.com/package/create-tanstack-cn) and [`tanstack-cn`](https://www.npmjs.com/package/tanstack-cn).

![tanstack-cn](templates/default/public/og.png)

## Scaffold

```bash
bunx create-tanstack-cn@latest my-app
# or
npm create tanstack-cn@latest my-app
# or clone the template directly:
bunx degit ramonclaudio/tanstack-cn/templates/default my-app
```

The CLI copies the template, rewrites `package.json` with your project name, installs dependencies with the detected package manager (bun, pnpm, yarn, npm), and inits a git repo with an initial commit. Flags: `-y`, `--no-install`, `--no-git`. `bunx tanstack-cn` prints the same instructions and exits.

## What's in the box

TanStack Start + Router with file-based routing. Nitro 3 for SSR. React 19, TypeScript 6 with `strict` and `verbatimModuleSyntax`, Vitest 4 + `@testing-library/react` + jsdom. Vite 8 with Rolldown and Oxc plugins. Tailwind v4 via `@tailwindcss/vite`. shadcn/ui's `base-luma` theme on `@base-ui/react`, not Radix. HugeIcons + Geist Variable. Oxlint 1.63 with 240 rules across 8 plugins, type-aware via `oxlint-tsgolint`. Oxfmt with native import, Tailwind, and `package.json` field sorting. Sonner toasts, theme provider, web vitals reporter. Bun runtime.

Light/dark/system theme with a no-flash script. Top header bar with home icon and theme toggle, semantic `<header>` + `<main id="main">` landmarks, working skip link, `prefers-reduced-motion` honored globally. Route-level preloading via TanStack Router `defaultPreload: "intent"`. Vite dev `server.warmup` pre-bundles routes and components. Error boundary and 404 route hooked into the root.

Full SEO and social. OG/Twitter meta with absolute URLs and `image:width/height`. JSON-LD `@graph` with WebSite, SoftwareSourceCode, and Person. Canonical link, `og:site_name`, full Twitter meta. Sitemap, robots.txt with AI training crawler opt-outs (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, Bytespider, meta-externalagent). RFC 9116 `security.txt`. `llms.txt` and `llms-full.txt` for Claude, Perplexity, ChatGPT Search. PWA manifest with `any`, `maskable`, and `monochrome` icons + wide and narrow screenshots + shortcuts. `theme-color` per scheme, `color-scheme`, `mobile-web-app-capable`. OG image is a 2400×1260 PNG, retina-crisp, under 500 KB, unfurls clean on X, Facebook, LinkedIn, Discord, Slack, iMessage.

Security headers via Nitro `routeRules` in `vite.config.ts`, same on every preset (Vercel, Cloudflare, Netlify, Node, Bun): `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` (camera/mic/geo off), `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Origin-Agent-Cluster`. GitHub Actions CI runs typecheck, lint, fmt:check, test, build on every push.

## Repo layout

```
tanstack-cn/
├── packages/
│   ├── create-tanstack-cn/   # scaffolder CLI, published as `create-tanstack-cn`
│   └── tanstack-cn/          # name-reservation CLI, published as `tanstack-cn`
└── templates/
    └── default/              # the starter the CLI scaffolds
```

[`create-tanstack-cn`](packages/create-tanstack-cn) is the interactive scaffolder. [`tanstack-cn`](packages/tanstack-cn) is a thin redirect that prints install instructions and exits. [`templates/default`](templates/default) is the starter source with its own scaffold-level README.

## Lighthouse

Production, desktop, 5-run p50, against [tanstack-cn.vercel.app](https://tanstack-cn.vercel.app):

```
Performance       100
Accessibility     100
Best Practices    100
SEO               100
LCP               429ms
FCP               429ms
CLS               0.000
TBT               0ms
TTFB              46ms
Speed Index       459ms
```

## Development

```bash
bun install                   # install monorepo workspaces
bun run build                 # build both packages
bun run typecheck             # typecheck both packages
bun run template:dev          # run the template locally on :3000
bun run template:test         # run the template test suite
```

Test the CLI locally:

```bash
cd packages/create-tanstack-cn
bun run build
node dist/index.js /tmp/scratch-app
```

## Release

Tag-driven publish. Bump `packages/*/package.json` versions to match the tag, commit, tag, push:

```bash
git tag v0.2.0
git push --follow-tags
```

`.github/workflows/publish.yml` validates the version match, builds, and publishes both with OIDC provenance. Requires the `NPM_TOKEN` repo secret.

## License

MIT.
