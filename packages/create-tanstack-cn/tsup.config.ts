import { cpSync, mkdirSync, rmSync } from "node:fs"
import { defineConfig } from "tsup"

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
  },
})
