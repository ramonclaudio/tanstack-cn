import { existsSync } from "node:fs"
import { cp, readFile, writeFile } from "node:fs/promises"
import { basename, dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { Command } from "commander"
import { execa } from "execa"
import kleur from "kleur"
import ora from "ora"
import prompts from "prompts"

import pkg from "../package.json" with { type: "json" }

const here = dirname(fileURLToPath(import.meta.url))
const TEMPLATE_DIR = join(here, "templates", "default")

type PM = "bun" | "pnpm" | "yarn" | "npm"

type Flags = {
  install: boolean
  git: boolean
  yes: boolean
}

async function main() {
  const program = new Command()
    .name("create-tanstack-cn")
    .description(
      "Scaffold a new tanstack-cn project. TanStack Start on Vite 8 + Oxc, Tailwind v4 + shadcn base-luma on Base UI.",
    )
    .argument("[directory]", "project directory name")
    .option("--no-install", "skip installing dependencies")
    .option("--no-git", "skip git init")
    .option("-y, --yes", "accept defaults, skip prompts")
    .version(pkg.version, "-v, --version")
    .parse()

  const flags = program.opts<Flags>()
  const argDir = program.args[0]

  intro()

  const name = await resolveName(argDir, flags.yes)
  const target = resolve(process.cwd(), name)

  if (existsSync(target)) {
    console.error(kleur.red(`\nTarget ${target} already exists. Pick a different name.`))
    process.exit(1)
  }

  const pm = detectPackageManager()

  const copySpin = ora(`Copying template to ${kleur.cyan(relative(process.cwd(), target) || ".")}`).start()
  try {
    await cp(TEMPLATE_DIR, target, { recursive: true })
    await rewritePackage(target)
    copySpin.succeed(`Template copied`)
  } catch (err) {
    copySpin.fail(`Template copy failed`)
    throw err
  }

  if (flags.install) {
    const installSpin = ora(`Installing dependencies with ${kleur.cyan(pm)}`).start()
    try {
      await execa(pm, ["install"], { cwd: target, stdio: "ignore" })
      installSpin.succeed(`Installed with ${pm}`)
    } catch {
      installSpin.warn(`Install skipped. Run ${kleur.cyan(`${pm} install`)} manually.`)
    }
  }

  if (flags.git) {
    const gitSpin = ora(`Initializing git`).start()
    try {
      await execa("git", ["init", "--initial-branch=main"], { cwd: target, stdio: "ignore" })
      await execa("git", ["add", "-A"], { cwd: target, stdio: "ignore" })
      await execa(
        "git",
        ["commit", "-m", "feat: initial commit", "--no-gpg-sign"],
        { cwd: target, stdio: "ignore" },
      )
      gitSpin.succeed(`Git repo initialized`)
    } catch {
      gitSpin.warn(`Git init skipped`)
    }
  }

  nextSteps(target, flags, pm)
}

async function resolveName(argDir: string | undefined, yes: boolean): Promise<string> {
  if (argDir) return argDir
  if (yes) return "my-tanstack-cn-app"

  const res = await prompts(
    {
      type: "text",
      name: "name",
      message: "Project directory",
      initial: "my-tanstack-cn-app",
      validate: (v: string) =>
        /^[a-z0-9][a-z0-9-]*$/.test(v) ? true : "lowercase letters, numbers, dashes; must start alphanumeric",
    },
    { onCancel: () => process.exit(1) },
  )

  return res.name as string
}

async function rewritePackage(target: string): Promise<void> {
  const pkgPath = join(target, "package.json")
  const raw = await readFile(pkgPath, "utf8")
  const parsed = JSON.parse(raw) as Record<string, unknown>
  const cleaned: Record<string, unknown> = {
    name: toPackageName(target),
    version: "0.0.0",
    private: true,
    type: "module",
  }
  for (const key of [
    "sideEffects",
    "scripts",
    "dependencies",
    "devDependencies",
    "peerDependencies",
  ]) {
    if (parsed[key] !== undefined) cleaned[key] = parsed[key]
  }
  await writeFile(pkgPath, `${JSON.stringify(cleaned, null, 2)}\n`)
}

function toPackageName(raw: string): string {
  const name = basename(raw)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "")
  return name || "my-tanstack-cn-app"
}

function detectPackageManager(): PM {
  const ua = process.env.npm_config_user_agent ?? ""
  if (ua.startsWith("bun")) return "bun"
  if (ua.startsWith("pnpm")) return "pnpm"
  if (ua.startsWith("yarn")) return "yarn"
  if (ua.startsWith("npm")) return "npm"
  return "bun"
}

function intro(): void {
  console.log()
  console.log(kleur.bold().cyan("create-tanstack-cn") + kleur.gray(` v${pkg.version}`))
}

function nextSteps(target: string, flags: Flags, pm: PM): void {
  const cdPath = relative(process.cwd(), target) || "."
  console.log()
  console.log(kleur.bold("Next steps:"))
  console.log(kleur.gray("  cd ") + kleur.cyan(cdPath))
  if (!flags.install) console.log(kleur.gray(`  ${pm} install`))
  console.log(kleur.gray(`  ${pm} run dev`))
  console.log()
  console.log(kleur.gray("Docs: ") + kleur.cyan("https://github.com/ramonclaudio/tanstack-cn"))
  console.log()
}

main().catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})
