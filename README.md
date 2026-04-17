# tanstack-cn

![tanstack-cn](templates/default/public/og.png)

TanStack Start starter on the latest majors. Vite 8 Rolldown+Oxc, Tailwind v4 + shadcn/ui base-luma on Base UI, Oxlint+Oxfmt. No Radix, no ESLint, no Prettier.

[Live demo](https://tanstack-cn.vercel.app) · [Use this template](https://github.com/ramonclaudio/tanstack-cn/generate)

## Scaffold

```bash
bunx create-tanstack-cn@latest my-app
# or
npm create tanstack-cn@latest my-app
# or clone the template directly:
bunx degit ramonclaudio/tanstack-cn/templates/default my-app
```

Running `bunx tanstack-cn` also prints these same instructions.

## Repo layout

```
tanstack-cn/
├── packages/
│   ├── create-tanstack-cn/   # the CLI published as `create-tanstack-cn`
│   └── tanstack-cn/          # reserved `tanstack-cn` package, redirect CLI
└── templates/
    └── default/              # the starter code the CLI scaffolds
```

| Package | What it is |
| --- | --- |
| [`create-tanstack-cn`](packages/create-tanstack-cn) | Interactive scaffolder. Published to npm, used via `bunx create-tanstack-cn@latest`. |
| [`tanstack-cn`](packages/tanstack-cn) | Name reservation. `bunx tanstack-cn` prints install instructions and exits. |
| [`templates/default`](templates/default) | The starter code that ships when you scaffold. Full README lives there. |

## Why this exists

Every TanStack Start + shadcn starter on GitHub ships last year's choices: Radix, ESLint, Prettier, Webpack-era Vite. This one doesn't. Latest majors across the board, SEO and security plumbing wired, nothing to strip out.

See [`templates/default/README.md`](templates/default/README.md) for the full stack and feature list.

## Development

```bash
bun install                   # install monorepo workspaces
bun run build                 # build both packages
bun run typecheck             # typecheck both packages
bun run template:dev          # run the template locally
bun run template:test         # run the template test suite
```

### Testing the CLI locally

```bash
cd packages/create-tanstack-cn
bun run build
node dist/index.js /tmp/scratch-app
cd /tmp/scratch-app && bun install && bun run dev
```

## Release

Packages publish via tag push. Bump versions in both `packages/*/package.json`, commit, tag, push:

```bash
git tag v0.2.0
git push --follow-tags
```

CI builds and publishes both packages to npm with provenance via OIDC.

## License

MIT © [Ramon Claudio](https://github.com/ramonclaudio)
