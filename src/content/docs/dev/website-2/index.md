---
title: Overview
description: Developer overview for Website 2
---

Website 2 is a WooCommerce-powered e-commerce site with a membership layer (MemberPress). It handles a high volume of concurrent checkouts and has stricter performance requirements than Website 1.

## Repo

```
git@github.com:your-org/website-2.git
```

## Stack differences

- **WooCommerce** 8.x + **MemberPress** for memberships and gated content
- **Stripe** for payments (WooCommerce Stripe Gateway)
- Dedicated Redis instance for WooCommerce session storage
- Separate read replica MySQL for reporting queries — never run reports against the primary

## Critical: cache exclusions

WooCommerce pages must be excluded from full-page cache. These exclusions are already configured in Nginx, but verify them after any server config change:

```
/cart
/checkout
/my-account
/wc-api
```

## Pages in this section

- [WooCommerce setup](/dev/website-2/woocommerce) — store configuration, custom order flows
- [Membership system](/dev/website-2/memberships) — MemberPress setup, gating logic, integrations
