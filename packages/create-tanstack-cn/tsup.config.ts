import { cpSync, existsSync, mkdirSync, renameSync, rmSync } from "node:fs"
import { relative } from "node:path"
import { defineConfig } from "tsup"

// npm always strips certain dotfiles from published tarballs (.gitignore,
// .npmrc, .npmignore, etc). Rename files that collide with that list so the
// CLI can restore them at scaffold time.
const RENAMES: Array<[string, string]> = [[".gitignore", "_gitignore"]]

// Never bundle these into the template tarball. Lockfiles regenerate on
// install; build output and vendored deps don't belong in a scaffold source.
const EXCLUDE_DIRS = new Set([
  "node_modules",
  "dist",
  "dist-ssr",
  "coverage",
  ".output",
  ".nitro",
  ".tanstack",
  ".wrangler",
  ".vinxi",
])
const EXCLUDE_FILES = new Set([
  "bun.lock",
  "bun.lockb",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  ".DS_Store",
])

const TEMPLATE_SRC = "../../templates/default"

function shouldInclude(src: string): boolean {
  const rel = relative(TEMPLATE_SRC, src)
  if (!rel) return true
  const [head, ...rest] = rel.split("/")
  if (EXCLUDE_DIRS.has(head)) return false
  const basename = rest.length > 0 ? (rest.at(-1) as string) : head
  if (EXCLUDE_FILES.has(basename)) return false
  return true
}

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  clean: true,
  minify: false,
  dts: false,
  shims: false,
  sourcemap: false,
  banner: { js: "#!/usr/bin/env node" },
  onSuccess: async () => {
    rmSync("dist/templates", { recursive: true, force: true })
    mkdirSync("dist/templates", { recursive: true })
    cpSync(TEMPLATE_SRC, "dist/templates/default", {
      recursive: true,
      filter: shouldInclude,
    })
    for (const [from, to] of RENAMES) {
      const src = `dist/templates/default/${from}`
      if (existsSync(src)) renameSync(src, `dist/templates/default/${to}`)
    }
  },
})
