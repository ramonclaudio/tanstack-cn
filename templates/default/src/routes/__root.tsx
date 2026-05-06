import Home01Icon from "@hugeicons/core-free-icons/Home01Icon"
import { HugeiconsIcon } from "@hugeicons/react"
import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"

import { DefaultCatchBoundary } from "@/components/default-catch-boundary"
import { NotFound } from "@/components/not-found"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { WebVitals } from "@/components/web-vitals"
import { seo } from "@/lib/seo"
import {
  AUTHOR_GITHUB,
  AUTHOR_NAME,
  AUTHOR_URL,
  REPO_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site"
import { cn } from "@/lib/utils"

import appCss from "../styles.css?url"

const Devtools = import.meta.env.DEV
  ? lazy(() => import("@/components/devtools").then((m) => ({ default: m.Devtools })))
  : null

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${SITE_URL}/#sourcecode`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      codeRepository: REPO_URL,
      programmingLanguage: ["TypeScript", "TSX", "CSS"],
      runtimePlatform: "Bun",
      license: "https://opensource.org/licenses/MIT",
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      sameAs: [AUTHOR_GITHUB],
    },
  ],
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "color-scheme", content: "light dark" },
      { name: "format-detection", content: "telephone=no" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      ...(import.meta.env.VITE_COMMIT_SHA
        ? [{ name: "x-commit-sha", content: import.meta.env.VITE_COMMIT_SHA }]
        : []),
      // Uncomment and fill in after registering in Google Search Console / Bing Webmaster.
      // { name: "google-site-verification", content: "YOUR_TOKEN" },
      // { name: "msvalidate.01", content: "YOUR_TOKEN" },
      ...seo({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        image: "/og.png",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      // Fediverse verification: fill in your own profile URL.
      // { rel: "me", href: "https://mastodon.social/@ramonclaudio" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background focus:ring-2 focus:ring-ring focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <WebVitals />
          <header className="fixed inset-x-0 top-4 z-40">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
              <Link
                to="/"
                aria-label="Home"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "[&_svg]:size-[1.2rem]",
                )}
              >
                <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
              </Link>
              <ThemeToggle />
            </div>
          </header>
          <main id="main">{children}</main>
          <Toaster />
          {Devtools ? (
            <Suspense fallback={null}>
              <Devtools />
            </Suspense>
          ) : null}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
