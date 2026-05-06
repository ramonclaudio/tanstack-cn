# create-tanstack-cn

Scaffold a [tanstack-cn](https://github.com/ramonclaudio/tanstack-cn) project. TanStack Start on Vite 8 (Rolldown+Oxc), Tailwind v4 + shadcn `base-luma` on Base UI, Oxlint+Oxfmt.

```bash
npm create tanstack-cn@latest my-app
# or
pnpm create tanstack-cn@latest my-app
# or
bunx create-tanstack-cn@latest my-app
# or
yarn create tanstack-cn my-app
```

The CLI copies `templates/default` into your target, rewrites `package.json` with your project name (version `0.0.0`), runs `<package-manager> install`, and inits a git repo with an initial commit. Package manager is detected from `npm_config_user_agent`.

## Flags

```
<directory>          positional, project directory name
-y, --yes            accept defaults, skip prompts
--no-install         skip dependency install
--no-git             skip git init + initial commit
-v, --version        print CLI version
-h, --help           print help
```

## After scaffold

```bash
cd my-app
npm run dev   # or pnpm dev, bun run dev, yarn dev
```

Dev server on `http://localhost:3000`. Full docs ship in the scaffolded project's README.

Repo, release notes, and template source: [`ramonclaudio/tanstack-cn`](https://github.com/ramonclaudio/tanstack-cn).

## License

MIT.
