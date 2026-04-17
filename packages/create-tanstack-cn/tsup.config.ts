import { cpSync, existsSync, mkdirSync, renameSync, rmSync } from "node:fs"
import { defineConfig } from "tsup"

// npm always strips certain dotfiles from published tarballs (.gitignore,
// .npmrc, .npmignore, etc). Rename files that collide with that list so the
// CLI can restore them at scaffold time.
const RENAMES: Array<[string, string]> = [[".gitignore", "_gitignore"]]

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
    cpSync("../../templates/default", "dist/templates/default", { recursive: true })
    for (const [from, to] of RENAMES) {
      const src = `dist/templates/default/${from}`
      if (existsSync(src)) renameSync(src, `dist/templates/default/${to}`)
    }
  },
})
