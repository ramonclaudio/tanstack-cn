# create-tanstack-cn

Scaffold a new [tanstack-cn](https://github.com/ramonclaudio/tanstack-cn) project.

TanStack Start on Vite 8 Rolldown+Oxc, Tailwind v4 + shadcn `base-luma` on Base UI, Oxlint+Oxfmt. No Radix, no ESLint, no Prettier.

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

## What it does

1. Copies the `templates/default` starter into your target directory
2. Rewrites `package.json` with your project name, resets version to `0.0.0`, strips template-specific metadata
3. Runs `<package-manager> install` to install dependencies
4. Initializes a git repo with an initial commit

The package manager is detected from `npm_config_user_agent`, so `bun create` uses Bun, `pnpm create` uses pnpm, etc. Falls back to Bun when run directly.

## Flags

| Flag                 | Default       | Purpose                                      |
| -------------------- | ------------- | -------------------------------------------- |
| `<directory>`        |               | Positional project directory name            |
| `-y`, `--yes`        | `false`       | Accept defaults, skip prompts                |
| `--no-install`       | install runs  | Skip dependency install                      |
| `--no-git`           | git init runs | Skip `git init` + initial commit             |
| `-v`, `--version`    |               | Print CLI version                            |
| `-h`, `--help`       |               | Print help                                   |

## After scaffold

```bash
cd my-app
bun run dev
```

Dev server on `http://localhost:3000`. Full docs and scripts ship in the scaffolded project's README.

## Upstream

Repo, release notes, and the template source: [`ramonclaudio/tanstack-cn`](https://github.com/ramonclaudio/tanstack-cn).

## License

MIT
