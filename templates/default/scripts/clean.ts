/**
 * tanstack-cn clean script.
 *
 * Wipes node_modules, lockfiles, build artifacts, and generated files.
 * Reinstalls deps via the detected package manager. Runs the verify chain
 * (build, fmt:check, lint, typecheck, test) to confirm the project is clean.
 *
 * PM-agnostic: detects bun/pnpm/yarn/npm via `npm_config_user_agent` or lockfile.
 * Uses macOS `trash` so anything wiped is recoverable.
 *
 * Usage:
 *   <pm> run clean       # full wipe + reinstall + verify
 */

import { spawn as nodeSpawn } from "node:child_process"
import { existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

type PM = "bun" | "pnpm" | "yarn" | "npm"

function detectPackageManager(): PM {
  const ua = (process.env.npm_config_user_agent ?? "").toLowerCase()
  if (ua.startsWith("bun")) return "bun"
  if (ua.startsWith("pnpm")) return "pnpm"
  if (ua.startsWith("yarn")) return "yarn"
  if (ua.startsWith("npm")) return "npm"
  if (existsSync("bun.lock")) return "bun"
  if (existsSync("pnpm-lock.yaml")) return "pnpm"
  if (existsSync("yarn.lock")) return "yarn"
  return "npm"
}

function spawn(argv: ReadonlyArray<string>, opts: { quiet?: boolean } = {}): Promise<number> {
  return new Promise((res) => {
    const proc = nodeSpawn(argv[0], argv.slice(1), {
      stdio: opts.quiet ? "ignore" : "inherit",
    })
    proc.on("close", (code) => res(code ?? 1))
  })
}

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..")
process.chdir(REPO)

const PATHS = [
  "node_modules",
  "bun.lock",
  "pnpm-lock.yaml",
  "yarn.lock",
  "package-lock.json",
  ".nitro",
  ".output",
  ".tanstack",
  ".wrangler",
  ".vinxi",
  "dist",
  "dist-ssr",
  "coverage",
  "src/routeTree.gen.ts",
]

async function step<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()
  process.stderr.write(`→ ${name}\n`)
  try {
    const result = await fn()
    process.stderr.write(`  ✓ ${((performance.now() - start) / 1000).toFixed(1)}s\n`)
    return result
  } catch (err) {
    process.stderr.write(`  ✗ ${((performance.now() - start) / 1000).toFixed(1)}s\n`)
    throw err
  }
}

async function trashIfExists(path: string): Promise<void> {
  if (!existsSync(path)) return
  const code = await spawn(["trash", path], { quiet: true })
  if (code !== 0) throw new Error(`trash ${path} exited ${code}`)
}

async function run(cmd: ReadonlyArray<string>): Promise<void> {
  const code = await spawn(cmd)
  if (code !== 0) throw new Error(`${cmd.join(" ")} exited ${code}`)
}

void (async () => {
  const pm = detectPackageManager()
  const startedAt = performance.now()

  try {
    await step("trash artifacts", async () => {
      for (const p of PATHS) await trashIfExists(p)
      // .DS_Store cleanup, swallow errors (find -exec exits non-zero on no matches)
      await spawn(
        [
          "find",
          ".",
          "-name",
          ".DS_Store",
          "-not",
          "-path",
          "./node_modules/*",
          "-exec",
          "trash",
          "{}",
          "+",
        ],
        { quiet: true },
      )
    })

    await step(`${pm} install`, () => run([pm, "install"]))
    await step("vite build", () => run(["vite", "build"]))
    await step("oxfmt --check", () => run(["oxfmt", "--check"]))
    await step("oxlint", () => run(["oxlint"]))
    await step("tsc --noEmit", () => run(["tsc", "--noEmit"]))
    await step("vitest run", () => run(["vitest", "run"]))

    process.stderr.write(`\n✓ ${((performance.now() - startedAt) / 1000).toFixed(1)}s total\n`)
  } catch (err) {
    process.stderr.write(`\n✗ ${err instanceof Error ? err.message : String(err)}\n`)
    process.exit(1)
  }
})()
