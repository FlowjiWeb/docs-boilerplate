---
title: Membership system
description: MemberPress setup, gating logic, and integrations for Website 2
---

## Membership tiers

| Tier | Slug | Access |
|---|---|---|
| Free | `free` | Public content + free resources |
| Pro | `pro` | All free content + premium articles, downloads |
| Business | `business` | All Pro content + API access, team seats |

Tiers are defined in MemberPress under **Memberships**. Do not rename slugs — they are referenced in code.

## Content gating

Access rules are managed in MemberPress under **Rules**. The general approach:

- Free content: no rule (publicly accessible)
- Gated content: rule set to require `pro` or `business` membership
- Partial gating (teaser + paywall): handled by the `ws2-paywall` custom plugin

Avoid gating entire categories — gate at the post level or use a dedicated gated category to keep rules manageable.

## Integrations

**Mailchimp** — membership status changes (new, upgraded, cancelled) trigger Mailchimp tag updates via the MemberPress Mailchimp add-on. Tag naming convention: `mp-{tier-slug}` (e.g. `mp-pro`).

**Stripe** — subscription billing is handled by the MemberPress Stripe gateway. Recurring payments, dunning, and cancellations are managed there — do not intervene directly in Stripe.

## Debugging access issues

If a member reports they can't access content they should have:

```bash
# Check their active memberships
wp eval 'print_r(MeprUser::get_active_memberships(get_user_by("email","user@example.com")->ID));'

# Force a capability refresh
wp eval 'MeprUser::refresh_capabilities();'
```
