# docs-boilerplate — Progress

## Current Phase

Foundation — core site working, placeholder content in place

## In Progress

_(none)_

## Completed

- [x] Project initialized with app-creation skill
- [x] Astro 6 + Starlight 0.38 + @pelagornis/page theme installed and working
- [x] Fixed Starlight v0.33+ breaking changes (social config syntax, defaultDarkMode removed)
- [x] Created `src/content.config.ts` for Astro v5+ content collections
- [x] Fixed locale config — root locale, no `/en/` prefix on URLs
- [x] Logo link fixed (was pointing to `/en`)
- [x] `TwoColumnContent` override — section-specific sidebar, hidden on homepage
- [x] `Header` override — section badge derived from sidebar `isCurrent` (not URL strings)
- [x] `sidebar-utils.ts` — shared `getCurrentSection()` utility
- [x] Removed `editLink` — Decap CMS handles editing
- [x] Placeholder WordPress content: global + website-1 + website-2 (dev and team)
- [x] `package-lock.json` gitignored
- [x] Centralized brand config — `src/site.config.ts` single source of truth for name, GitHub info, and all brand colors; `astro.config.mjs` imports from it; `Head.astro` injects `--config-*` CSS vars at render time; `custom.css` references vars instead of hardcoded hex
- [x] Cloudflare Pages deploy via GitHub Actions — Node 22, direct wrangler, npm install, `wrangler.toml` with project name placeholder
- [x] Decap CMS OAuth proxy — Cloudflare Pages Functions at `functions/api/auth.js` + `functions/api/callback.js`; GitHub OAuth app handles editor login
- [x] README updated with full step-by-step setup guide

## Blocked

_(none)_

## Next Up

- [ ] Zero Trust — document setup steps in README
- [ ] Sync workflow — test `sync-from-service-repo.yml` with a real service repo
- [ ] Custom domain — point `docs.ENV_NAME.com` at Cloudflare Pages

## Decision Log

| Date | Decision | Why |
|------|----------|-----|
| 2026-04-16 | Used `@pelagornis/page` theme | Clean modern look matching the kitchen sink preview |
| 2026-04-16 | Section badge derived from sidebar `isCurrent`, not URL | URL-based checks break when users rename directories |
| 2026-04-16 | Override `TwoColumnContent` (not `Sidebar`) | Page theme owns `TwoColumnContent` — Starlight's `Sidebar` override was bypassed |
| 2026-04-16 | Hourly cron deploy instead of deploy-on-push | Stays within Cloudflare's 500 builds/month free tier |
| 2026-04-16 | Gitignore `package-lock.json` | Template repos should resolve fresh versions on clone, not pin to old lock |
