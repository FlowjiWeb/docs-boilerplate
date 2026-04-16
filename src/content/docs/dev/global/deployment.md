---
title: Deployment
description: How to deploy ENV_NAME to staging and production
---

## Environments

| Environment | URL | Branch | Deploys |
|---|---|---|---|
| Local | `http://ENV_NAME.test` | any | manual |
| Staging | `https://staging.ENV_NAME.com` | `develop` | on push |
| Production | `https://ENV_NAME.com` | `main` | manual trigger |

## Deploying to staging

Push to `develop` — GitHub Actions runs the deploy pipeline automatically:

1. Composer install (no dev deps)
2. JS/CSS build (`npm run build`)
3. rsync to staging server over SSH
4. `wp cache flush` on the server

## Deploying to production

Production deploys are **manual** to avoid accidents.

1. Merge `develop` → `main` via a PR
2. Go to GitHub Actions → **Deploy to production** → **Run workflow**
3. Confirm the deploy completed in the Actions log
4. Spot-check the live site

## Database changes

Database changes are **never automated**. Before deploying any code that requires a schema change:

1. Take a backup: `wp db export --add-drop-table pre-deploy.sql`
2. Run the migration manually via WP-CLI or phpMyAdmin
3. Then deploy the code

## Rollback

```bash
# Revert the last deploy (re-deploys previous release)
# SSH into the server
cd /var/www/ENV_NAME
git checkout <previous-commit>
composer install --no-dev
wp cache flush
```
