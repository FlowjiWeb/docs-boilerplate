---
title: Architecture
description: Stack overview for ENV_NAME
---

## Stack at a glance

| Layer | Technology |
|---|---|
| CMS | WordPress (custom theme + plugins) |
| PHP | 8.2, OPcache enabled |
| Web server | Nginx + FastCGI |
| Database | MySQL 8 |
| Object cache | Redis (wp-redis) |
| Page cache | Nginx FastCGI cache |
| CDN | Cloudflare |
| Media | Cloudflare R2 (offloaded via WP Offload Media) |
| Hosting | SiteGround (production) |

## Request flow

```
User → Cloudflare CDN
  → Nginx FastCGI cache (hit: serve immediately)
  → PHP-FPM + WordPress
    → Redis object cache (wp_cache_get/set)
    → MySQL (only on cache miss)
```

## WordPress setup

- **Theme**: custom child theme of ENV_NAME-theme
- **Must-use plugins**: loaded from `wp-content/mu-plugins/`, version-controlled
- **Regular plugins**: managed via Composer (`composer.json` at repo root)
- **`wp-config.php`**: not in version control — use `wp-config-sample.php` as a base

## Environment variables

Sensitive config (DB credentials, API keys, salts) lives in a `.env` file loaded by the `vlucas/phpdotenv` package. Never commit `.env`.

```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=127.0.0.1

WP_ENV=development   # development | staging | production
WP_HOME=http://ENV_NAME.test
WP_SITEURL=${WP_HOME}/wp
```

## Database

Production uses a managed MySQL 8 instance. Schema changes are handled manually — there is no migration runner. Always take a dump before making structural changes.

```bash
# Dump production DB
wp db export --add-drop-table backup.sql

# Import locally
wp db import backup.sql
```
