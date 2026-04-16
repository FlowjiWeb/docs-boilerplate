---
title: Memberships
description: Managing member accounts and access on Website 2
---

## Membership tiers

| Tier | Price | What's included |
|---|---|---|
| Free | Free | Public content, free resources |
| Pro | $19/month or $190/year | Premium articles, downloads, community |
| Business | $49/month or $490/year | Everything in Pro + API access, up to 5 team seats |

## Viewing a member's account

1. **Members → Members** in the WP admin
2. Search by name or email
3. Click the member to see their active subscriptions, payment history, and login history

## Changing a member's tier

1. Open the member's account
2. Click **Add Membership** to upgrade, or click the current membership and set an expiry to downgrade
3. The change takes effect immediately

## Handling a member who can't access content

1. Check their account — is their subscription active and not expired?
2. Ask them to log out and log back in (most common fix)
3. If they're logged in and the content still won't load, contact a developer

## Cancellations and refunds

Members can cancel their subscription from **My Account → Memberships**. Cancellation stops the next billing cycle — access continues until the current period ends.

Refunds must be processed in **Stripe** directly, not in WordPress. Ask a developer or an admin with Stripe access.

## Pausing a subscription

MemberPress does not have a native pause feature. To temporarily suspend access:
1. Open the member's account
2. Set the membership expiry to today's date
3. Note the original expiry date in the member notes field
4. When they return, extend the expiry manually
