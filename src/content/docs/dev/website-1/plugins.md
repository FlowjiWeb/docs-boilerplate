---
title: Custom plugins
description: In-house plugins for Website 1
---

All custom plugins live in `wp-content/plugins/` and are version-controlled in the main repo.

## ws1-leads

Handles lead capture forms and syncs submissions to HubSpot via their Forms API.

- Form submissions are stored locally in a custom DB table as a backup before the API call
- Failed syncs are retried via WP-Cron every 15 minutes
- Config: `WS1_HUBSPOT_API_KEY` in `.env`

## ws1-redirects

CSV-driven redirect manager. Editors upload a CSV in the WP admin; the plugin writes rules to a custom DB table and serves them before WordPress boots (via an `mu-plugins` dropin).

Much faster than query-based redirect plugins for large redirect sets (500+).

## ws1-cache-purge

Hooks into `save_post` and `wp_update_nav_menu` to selectively purge WP Engine's page cache for affected URLs only. Avoids full-site cache wipes on every publish.

## Third-party plugins (managed via Composer)

| Plugin | Purpose |
|---|---|
| Advanced Custom Fields Pro | Custom field groups |
| WP Migrate DB Pro | DB sync between environments |
| Yoast SEO | On-page SEO fields |
| Gravity Forms | Complex form flows |
