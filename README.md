# tanstack-cn

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

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

Live demo: [tanstack-cn.vercel.app](https://tanstack-cn.vercel.app). The Vercel project has Root Directory set to `templates/default`, so it deploys the same way your scaffolded `my-app` does.

Scaffolded projects ship with `netlify.toml` and `wrangler.toml` and deploy to Vercel, Netlify, or Cloudflare Workers (not Pages — Workers + Static Assets is the modern path Cloudflare recommends as of 2026). Vercel auto-detects Nitro. Deploy steps live in the scaffolded `my-app/README.md`.

## License

MIT.
