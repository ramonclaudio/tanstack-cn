# create-tanstack-cn

Scaffold a new [tanstack-cn](https://github.com/ramonclaudio/tanstack-cn) project.

TanStack Start on Vite 8 Rolldown+Oxc, Tailwind v4 + shadcn base-luma on Base UI, Oxlint+Oxfmt. No Radix, no ESLint, no Prettier.

## Usage

```bash
bunx create-tanstack-cn@latest my-app
# or
npm create tanstack-cn@latest my-app
# or
pnpm create tanstack-cn@latest my-app
# or
yarn create tanstack-cn my-app
```

## Flags

| Flag | Default | Purpose |
| --- | --- | --- |
| `-y`, `--yes` | `false` | Skip prompts, use defaults |
| `--no-install` | install runs | Skip dependency install |
| `--no-git` | git init runs | Skip `git init` |
| `-v`, `--version` | | Print version |

## Post-scaffold

```bash
cd my-app
bun install
bun run dev
```

## License

MIT
