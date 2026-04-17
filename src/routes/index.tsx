import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  CodeSquareIcon,
  CommandIcon,
  Copy01Icon,
  CubeIcon,
  FlashIcon,
  GithubIcon,
  MagicWand01Icon,
  PackageIcon,
  PaintBoardIcon,
  RocketIcon,
  SparklesIcon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/")({ component: Home })

const INSTALL_CMD = "bunx degit ramonclaudio/tanstack-cn my-app"
const REPO_URL = "https://github.com/ramonclaudio/tanstack-cn"

const stack = [
  {
    icon: RocketIcon,
    name: "TanStack Start",
    detail: "SSR + file-based routing on Nitro 3.",
  },
  {
    icon: FlashIcon,
    name: "Vite 8 + Oxc",
    detail: "Rolldown bundler. Native toolchain. No ESLint, no Prettier.",
  },
  {
    icon: PaintBoardIcon,
    name: "Tailwind v4",
    detail: "shadcn/ui base-luma theme on OKLch tokens.",
  },
  {
    icon: CubeIcon,
    name: "Base UI",
    detail: "Not Radix. Built on @base-ui/react primitives.",
  },
  {
    icon: CodeSquareIcon,
    name: "TypeScript 6",
    detail: "strict, isolatedModules, verbatimModuleSyntax.",
  },
  {
    icon: PackageIcon,
    name: "Vitest 4",
    detail: "jsdom + @testing-library/react. Oxlint 1.59.",
  },
]

const highlights = [
  "React 19 automatic JSX transform",
  "HugeIcons + Geist Variable font",
  "Sonner toasts, theme provider, web vitals",
  "CI workflow wired for typecheck, lint, fmt, test, build",
]

function Home() {
  const [copied, setCopied] = useState(false)

  const copyInstall = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    toast.success("Copied to clipboard", { description: INSTALL_CMD })
    setTimeout(() => setCopied(false), 2000)
  }

  const notify = () => {
    toast("Sonner is wired up.", {
      description: "base-luma tokens, Hugeicons, theme-aware.",
      action: { label: "Nice", onClick: () => {} },
    })
  }

  return (
    <main id="main" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <section className="flex flex-col items-start gap-6">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="grid size-11 place-items-center rounded-2xl bg-foreground text-[0.95rem] font-semibold tracking-[-0.06em] text-background shadow-md ring-1 ring-foreground/10"
          >
            cn
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <HugeiconsIcon icon={SparklesIcon} className="size-3.5" />
            <span>Vite 8 · Oxc · Base UI</span>
          </div>
        </div>
        <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">tanstack-cn</h1>
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          TanStack Start on Vite 8 Rolldown+Oxc. Tailwind v4 + shadcn/ui base-luma on Base UI.
          Oxlint + Oxfmt. React 19, TypeScript 6, Vitest 4. No Radix. No ESLint. No Prettier.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            <HugeiconsIcon icon={GithubIcon} data-icon="inline-start" />
            Use this template
            <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
          </a>
          <a
            href={`${REPO_URL}#readme`}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Read the docs
          </a>
        </div>

        <InputGroup className="max-w-xl">
          <InputGroupAddon>
            <HugeiconsIcon icon={CommandIcon} />
          </InputGroupAddon>
          <InputGroupInput
            value={INSTALL_CMD}
            readOnly
            aria-label="Install command"
            className="font-mono text-xs"
          />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘</Kbd>
            <Kbd>C</Kbd>
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              onClick={copyInstall}
              aria-label="Copy command"
            >
              <HugeiconsIcon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </section>

      <Separator className="my-16" />

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">What's in the box</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Six choices, all on the latest majors.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <Card key={item.name} size="sm">
              <CardContent className="flex flex-col gap-2">
                <div className="flex size-9 items-center justify-center rounded-2xl bg-muted">
                  <HugeiconsIcon icon={item.icon} className="size-5" />
                </div>
                <div className="mt-2 font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.detail}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ul className="mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {highlights.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="mt-0.5 size-4 text-foreground"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-16" />

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">Components, pre-wired</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            shadcn primitives land in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              src/components/ui/
            </code>
            . Add more with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              bunx shadcn@latest add
            </code>
            .
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Alert>
            <HugeiconsIcon icon={MagicWand01Icon} />
            <AlertTitle>base-luma theme</AlertTitle>
            <AlertDescription>
              Rounded-4xl, soft rings, OKLch palette. Light and dark out of the box.
            </AlertDescription>
          </Alert>

          <Alert>
            <HugeiconsIcon icon={StarIcon} />
            <AlertTitle>Trigger a toast</AlertTitle>
            <AlertDescription className="flex items-center gap-3">
              <span>Sonner is already mounted in the root route.</span>
              <Button size="xs" variant="outline" onClick={notify}>
                Try it
              </Button>
            </AlertDescription>
          </Alert>
        </div>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={CubeIcon} />
            </EmptyMedia>
            <EmptyTitle>Your routes go here</EmptyTitle>
            <EmptyDescription>
              File-based routing in{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/routes/</code>.
              Start a project and the router regenerates on save.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>
          MIT. Built by{" "}
          <a
            href="https://github.com/ramonclaudio"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            @ramonclaudio
          </a>
          .
        </span>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline"
        >
          <HugeiconsIcon icon={GithubIcon} className="size-4" />
          ramonclaudio/tanstack-cn
        </a>
      </footer>
    </main>
  )
}
