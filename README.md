# tanstack-cn

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/ramonclaudio/tanstack-cn/ci.yml?branch=main&label=ci&style=flat-square&logo=github)](https://github.com/ramonclaudio/tanstack-cn/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/website?url=https%3A%2F%2Ftanstack-cn.vercel.app&label=vercel&logo=vercel&logoColor=white&up_color=black&down_color=red&style=flat-square)](https://tanstack-cn.vercel.app)
[![Cloudflare Workers](https://img.shields.io/website?url=https%3A%2F%2Ftanstack-cn.hello-8fa.workers.dev&label=cloudflare%20workers&logo=cloudflare&logoColor=white&up_color=F38020&down_color=red&style=flat-square)](https://tanstack-cn.hello-8fa.workers.dev)

![tanstack-cn](templates/default/public/og.png)

Home for the [`create-tanstack-cn`](https://www.npmjs.com/package/create-tanstack-cn) CLI and the [template](templates/default) it scaffolds. Spins up a new TanStack Start + shadcn project: Vite 8 (Rolldown + Oxc), Tailwind v4, shadcn/ui `base-luma` on Base UI, React 19, TypeScript 6, Vitest 4. Use any package manager: npm, pnpm, bun, or yarn.

## Scaffold

```bash
npm create tanstack-cn@latest my-app
# or
pnpm create tanstack-cn@latest my-app
# or
bunx create-tanstack-cn@latest my-app
# or
yarn create tanstack-cn my-app
```

## Live demos

The same template, deployed to two supported targets. Every push to `main` auto-deploys to both via the platforms' GitHub integrations, and each posts its own commit status (`Vercel`, `Workers Builds: tanstack-cn`).

| Platform | URL | Config |
|---|---|---|
| Vercel | [tanstack-cn.vercel.app](https://tanstack-cn.vercel.app) | [`vercel.json`](templates/default/vercel.json) |
| Cloudflare Workers | [tanstack-cn.hello-8fa.workers.dev](https://tanstack-cn.hello-8fa.workers.dev) | [`wrangler.toml`](templates/default/wrangler.toml) |

Each platform has Root Directory pointed at `templates/default`, so the demos build the exact same way your scaffolded `my-app` does. Pick whichever target fits, or deploy to both. Per-platform deploy steps live in the scaffolded `my-app/README.md`. Cloudflare uses Workers + Static Assets (not Pages — Workers is the modern path Cloudflare recommends as of 2026).

Scaffolded projects also ship `netlify.toml` for Netlify Functions deploys; we don't run a Netlify demo, but the config is there if you want it.

## License

MIT.
