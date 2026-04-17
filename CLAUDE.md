# docs-boilerplate

A reusable template for spinning up isolated documentation sites for WordPress projects, built on Astro Starlight, Cloudflare Pages, and Decap CMS.

## Tech Stack

- **Astro 6** + **Starlight 0.38** — static docs site framework
- **@pelagornis/page** — theme plugin
- **TypeScript** — overrides and utilities
- **Decap CMS** — no-code editor for team docs (`/admin`)
- **Cloudflare Pages** — hosting (free tier, hourly deploy cron)
- **GitHub Actions** — deploy pipeline + content sync from service repos
- **Cloudflare Zero Trust** — access control (free up to 50 users)

## Agent Roles

| Role | Model | How | Responsibility |
|------|-------|-----|----------------|
| **Orchestrator** | Main context | Inline | Coordinates all subagents — never implements directly |
| Architect | Claude Sonnet | Agent tool subagent | System design, tech decisions, planning |
| Coder (logic) | Claude Sonnet | Agent tool subagent | TS, Astro components, config, anything requiring reasoning |
| Coder (markup) | Gemini Flash | `gemini -p "..."` via Bash | CSS, HTML, template scaffolding |
| Reviewer | Claude Sonnet | Agent tool subagent | Code review, security audit |
| Tester | Claude Haiku | Agent tool subagent | Unit and integration tests |
| Documenter | Haiku | Agent tool subagent | Docs, README, PROGRESS.md |
| Debugger | Claude Sonnet | Agent tool subagent | Bug investigation and fixes |

## Model Routing

<CRITICAL>
MUST invoke the `task-routing` skill at the start of every session.
MUST prefix every task block with `[Role — Model]` before delegating.
MUST NOT implement, generate, or write anything inline — MUST delegate to the correct subagent.
</CRITICAL>

| Task type | Model | How |
|-----------|-------|-----|
| Architecture, planning | Sonnet | Agent tool — Architect subagent |
| TS, Astro components, config | Sonnet | Agent tool — Coder subagent |
| CSS, markup, template scaffolding | Gemini Flash | `gemini -p "..."` via Bash |
| Code review, security | Sonnet | Agent tool — Reviewer subagent |
| PROGRESS.md, CLAUDE.md, README | Haiku | Agent tool — Documenter subagent |

## Project Structure

```
src/
├── content/
│   └── docs/
│       ├── index.mdx          ← homepage (splash)
│       ├── dev/
│       │   ├── global/        ← global dev docs (written here)
│       │   └── {repo}/        ← synced from service repos via GitHub Actions
│       └── team/
│           ├── global/        ← global team docs (written here)
│           └── {repo}/        ← also editable via Decap CMS at /admin
├── overrides/
│   ├── TwoColumnContent.astro ← section-specific sidebar + hidden on homepage
│   ├── Header.astro           ← section badge (dev/team)
│   └── sidebar-utils.ts       ← getCurrentSection() shared utility
├── styles/
│   └── custom.css             ← theme variables, dark/light overrides
└── assets/
    └── logo.svg               ← replace with actual logo when cloning
public/
└── admin/                     ← Decap CMS entry point
.github/workflows/
├── deploy.yml                 ← hourly cron build → Cloudflare Pages
└── sync-from-service-repo.yml ← template: copy into service repos
```

## Key Conventions

- `ENV_NAME` is the placeholder throughout — find-replace when cloning
- Sidebar sections are driven by `astro.config.mjs` — each repo gets its own group
- Section badge and sidebar filtering are derived from sidebar `isCurrent` state — no hardcoded URL paths
- `package-lock.json` is gitignored — this is a template, not a production app
- Deploy is batched hourly (not per-push) to stay within Cloudflare's 500 builds/month free tier
- Decap CMS handles team docs editing — no "Edit this page" GitHub links

## Context Resumption

At session start: invoke `task-routing` skill → read PROGRESS.md → resume from "In Progress".
