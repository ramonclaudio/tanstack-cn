import { defineConfig } from "tsup"

const shared = {
  format: ["esm"] as const,
  target: "node20" as const,
  minify: false,
  dts: false,
  shims: false,
  sourcemap: false,
}

export default defineConfig([
  {
    ...shared,
    entry: { index: "src/index.ts" },
    clean: true,
  },
  {
    ...shared,
    entry: { cli: "src/cli.ts" },
    clean: false,
    banner: { js: "#!/usr/bin/env node" },
  },
])
