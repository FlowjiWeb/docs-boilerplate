---
title: Local setup
description: Get ENV_NAME running locally
---

## Prerequisites

- Docker Desktop
- WP-CLI (`brew install wp-cli`)
- Composer (`brew install composer`)
- Node 20+ (for any JS build steps)

## 1. Clone and install

```bash
git clone git@github.com:your-org/ENV_NAME.git
cd ENV_NAME
composer install
```

## 2. Environment config

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

```
DB_NAME=ENV_NAME
DB_USER=root
DB_PASSWORD=root
DB_HOST=127.0.0.1
WP_HOME=http://ENV_NAME.test
```

## 3. Start Docker

```bash
docker compose up -d
```

This starts:
- **nginx** on port 80
- **php-fpm** (PHP 8.2)
- **mysql** on port 3306
- **redis** on port 6379

## 4. Import the database

Ask a teammate for the latest dev database dump, then:

```bash
wp db import dev-dump.sql
```

## 5. Add local hostname

```bash
echo "127.0.0.1 ENV_NAME.test" | sudo tee -a /etc/hosts
```

Visit [http://ENV_NAME.test](http://ENV_NAME.test) — you should see the site.
WP admin is at [http://ENV_NAME.test/wp/wp-admin](http://ENV_NAME.test/wp/wp-admin).

## Useful WP-CLI commands

```bash
wp cache flush              # clear Redis object cache
wp cron event run --due-now # run pending cron jobs manually
wp search-replace 'https://ENV_NAME.com' 'http://ENV_NAME.test' --all-tables
```
