// SITE_URL falls back to localhost so a forker who skips `VITE_SITE_URL`
// produces obvious-wrong-in-prod SEO meta instead of pointing at someone
// else's deploy. Set `VITE_SITE_URL=https://your-app.example.com` per env.
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
export const SITE_NAME = "tanstack-cn"
export const SITE_TITLE = "tanstack-cn: TanStack Start on Vite 8 + Oxc, Tailwind v4, Base UI"
export const SITE_DESCRIPTION =
  "TanStack Start starter on the latest majors. Vite 8 Rolldown+Oxc, Tailwind v4 + shadcn base-luma on Base UI, Oxlint+Oxfmt. No Radix, no ESLint, no Prettier."
export const SITE_LOCALE = "en_US"
export const SITE_OG_IMAGE_ALT = "tanstack-cn: TanStack Start on Vite 8 + Oxc, Tailwind v4, Base UI"

export const AUTHOR_NAME = "Ramon Claudio"
export const AUTHOR_URL = "https://github.com/ramonclaudio"
export const AUTHOR_TWITTER = "@ramonclaudio"
export const AUTHOR_GITHUB = "https://github.com/ramonclaudio"

export const REPO_URL = "https://github.com/ramonclaudio/tanstack-cn"
