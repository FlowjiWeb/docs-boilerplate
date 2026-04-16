---
title: WooCommerce setup
description: Store configuration and custom order flows for Website 2
---

## Custom order statuses

Three custom statuses are registered in `inc/order-statuses.php`:

| Status | Slug | Meaning |
|---|---|---|
| Pending fulfilment | `wc-pending-ful` | Payment confirmed, awaiting warehouse pick |
| Partially shipped | `wc-partial-ship` | Multi-item order, some items dispatched |
| Awaiting return | `wc-return-wait` | Return requested, item not yet received |

## Checkout customisations

- VAT number field added to checkout for B2B customers — stored as order meta `_vat_number`
- Postcode validation runs client-side via a custom JS validator before form submission
- Guest checkout is disabled — customers must create an account (required by MemberPress)

## Payment gateway

Stripe is the sole payment method. The webhook endpoint is:

```
https://website-2.com/wc-api/WC_Gateway_Stripe
```

The webhook secret is stored in `.env` as `STRIPE_WEBHOOK_SECRET`. Do not rotate it without updating this value.

## Database

WooCommerce creates several high-write tables. Run the following periodically to keep them clean:

```bash
# Remove completed sessions older than 48h
wp wc clean --sessions

# Remove orphaned order items
wp wc clean --order-items
```
