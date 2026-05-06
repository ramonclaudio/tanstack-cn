#!/usr/bin/env node
/**
 * PM-agnostic dispatcher for monorepo scripts.
 *
 * `ws <script>`: run <script> across all workspaces using whichever PM
 * invoked this. Maps to:
 *   bun --filter '*' <script>
 *   pnpm -r run <script>
 *   yarn workspaces foreach --all run <script>
 *   npm run --workspaces <script>
 *
 * `template <script>`: cd into templates/default, install deps with the
 * detected PM, then run <script>.
 */

import { spawn, spawnSync } from "node:child_process"
import { existsSync } from "node:fs"

function detectPM() {
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

function exec(cmd, args, cwd) {
  return new Promise((res) => {
    const child = spawn(cmd, args, { stdio: "inherit", cwd })
    child.on("exit", (code, signal) => res(code ?? (signal ? 1 : 0)))
  })
}

const USAGE = "usage: dev.mjs ws|template <script>"

const pm = detectPM()
const [, , mode, target] = process.argv

if (!mode || !target) {
  console.error(USAGE)
  process.exit(2)
}

function yarnIsClassic() {
  const v = spawnSync("yarn", ["--version"], { encoding: "utf8" }).stdout?.trim() ?? ""
  return v.startsWith("1.")
}

if (mode === "ws") {
  const args =
    pm === "bun"
      ? ["--filter", "*", target]
      : pm === "pnpm"
        ? ["-r", "run", target]
        : pm === "yarn"
          ? yarnIsClassic()
            ? ["workspaces", "run", target]
            : ["workspaces", "foreach", "--all", "run", target]
          : ["run", "--workspaces", target]
  process.exit(await exec(pm, args))
}

if (mode === "template") {
  const cwd = "templates/default"
  const installCode = await exec(pm, ["install"], cwd)
  if (installCode !== 0) process.exit(installCode)
  process.exit(await exec(pm, ["run", target], cwd))
}

console.error(`unknown mode: ${mode}`)
process.exit(2)
