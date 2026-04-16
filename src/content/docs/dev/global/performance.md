---
title: Performance
description: Caching strategy and performance guidelines for ENV_NAME
---

## Caching layers

```
Browser cache (Cloudflare TTLs)
  → Cloudflare edge cache (static assets + cached HTML)
    → Nginx FastCGI cache (full-page HTML, 1h TTL)
      → Redis object cache (DB query results, 1h TTL)
        → MySQL (last resort)
```

## Nginx FastCGI cache

Full-page HTML is cached at the Nginx level. Cache is bypassed for:
- Logged-in users (`wordpress_logged_in_*` cookie present)
- Cart / checkout pages
- POST requests

To purge the Nginx cache manually:

```bash
# SSH into the server
sudo nginx -s reload        # soft reload (keeps connections)
sudo rm -rf /var/cache/nginx/ENV_NAME/*   # nuke full-page cache
```

## Redis object cache

WordPress object cache is backed by Redis via **wp-redis**. This caches `wp_cache_get/set` calls — database query results, transients, etc.

```bash
wp cache flush   # flush Redis object cache (safe to run anytime)
```

## Cloudflare

- Static assets (JS, CSS, images): **Cache Everything** rule, 30-day TTL
- HTML pages: **Cache Level: Standard**, respects Cache-Control headers from Nginx
- Image optimisation: **Polish** enabled (lossless for PNG, lossy for JPEG)
- Minification: handled by the build pipeline, not Cloudflare

## What to avoid

- **Avoid `wp_query` inside loops** — each creates a new DB query. Use `get_posts()` with a transient wrapper.
- **Avoid autoloaded options** — don't add large data to `wp_options` with `autoload=yes`. Check autoload size: `wp eval 'echo size_format(strlen(serialize(wp_load_alloptions())));'`
- **Avoid uncached external HTTP calls** — wrap `wp_remote_get()` calls in a transient with a reasonable TTL.
- **Don't flush cache on every save** — scope `clean_post_cache()` to the affected post, not site-wide.
