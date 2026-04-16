---
title: Overview
description: Developer overview for Website 1
---

Website 1 is a high-traffic marketing site built on WordPress. It runs a fully custom theme with no page builder — all templates are hand-coded PHP.

## Repo

```
git@github.com:your-org/website-1.git
```

Dev docs for this site are synced automatically from that repo into this section.

## Key differences from global setup

- Uses **WP Engine** for hosting instead of SiteGround
- Object cache is handled by WP Engine's built-in Redis — no separate wp-redis plugin
- Deployments go through the **WP Engine Git push** workflow, not rsync

## Pages in this section

- [Theme architecture](/dev/website-1/theme) — custom theme structure, template hierarchy, component system
- [Custom plugins](/dev/website-1/plugins) — plugins built in-house for this site
