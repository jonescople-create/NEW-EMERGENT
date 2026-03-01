# Email Automation Setup — IslandFruitGuide

## Overview

When a visitor enters their email into the lead magnet pop-up, the following automation should trigger:

1. **Store the email** in your email marketing platform
2. **Send the Welcome Email** (copy below) immediately
3. **Deliver the free ebook** download link
4. **Tag the subscriber** for future campaigns

---

## Recommended Platforms

| Platform | Free Tier | Best For |
|----------|-----------|----------|
| **Mailchimp** | 500 contacts | Beginners, easy setup |
| **ConvertKit** | 1,000 contacts | Creators, landing pages |
| **Brevo (Sendinblue)** | 300 emails/day | Transactional + marketing |
| **Supabase Edge Functions** | Custom | Full control, self-hosted |

---

## Integration Steps

### Option A: Mailchimp / ConvertKit

1. Create an account and set up a **list/audience** called "IslandFruitGuide Subscribers"
2. Create an **API key** in your platform settings
3. In `LeadMagnetPopup.tsx`, replace the `console.log` with an API call:

```typescript
// Replace the console.log in handleSubmit with:
await fetch("YOUR_API_ENDPOINT", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: email,
    source: "lead-magnet-popup",
    tags: ["free-ebook-download", "superfruits-guide"]
  })
});
```

4. Set up the **automation** in your platform:
   - Trigger: When subscriber is added with tag "free-ebook-download"
   - Action: Send the Welcome Email (below)

### Option B: Supabase Edge Function

1. Create a `subscribers` table:

```sql
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'lead-magnet-popup',
  subscribed_at timestamp with time zone default now(),
  tags text[] default '{}'
);
```

2. Create a Supabase Edge Function to handle the subscription and send the email via a transactional email service (Resend, Postmark, etc.)

---

## Welcome Email Copy

**Subject:** 🌴 Your Tropical Ebook is Here! Welcome to Island Fruit Guide

**Preview Text:** Download your guide to Soursop, Papaya & Banana inside...

---

**Body:**

Welcome to the Island Fruit Guide family!

We are so excited to share the magic of Caribbean and Jamaican superfruits with you. Whether you are looking for the incredible health benefits of Soursop, or want to spice up your kitchen with our Zesty Green Papaya Salad, you are in the right place.

👉 [BUTTON: Click Here to Download Your Free Ebook]
Link: https://image2url.com/r2/default/documents/1771979481368-df16b0ee-9819-4667-a8f2-4b3727d0f4b4.pdf

Inside, you'll find:
• The grounded truth about Soursop's health benefits.
• A complete 7-Day Tropical Meal Plan.
• Delicious, easy-to-make island recipes.

As a special thank you for joining our community, we want to offer you 10% off your first physical order from our store. Just use the code **TROPICAL10** at checkout.

[BUTTON: Shop Fresh Island Goods Now]
Link: https://islandfruitguide.com/#/store

Enjoy the vibrant flavors of the islands, and let us know which recipe you try first!

Warmly,
The Team at Island Fruit Guide
islandfruitguide.com

---

## Discount Code Setup

Code: **TROPICAL10**
Discount: 10% off first order
Validity: Single-use per email
Implementation: Set up in your e-commerce checkout system

---

## Product Bundling Logic

The `ProductBundleBar` component appears on the Buy Fruits page. When a customer interacts with physical products, the bar offers the free digital ebook as a value-add bonus.

**Logic:**
1. Visitor sees the Buy Fruits page
2. A banner appears: "Free Gift with your order!"
3. Visitor enters email → receives the ebook immediately
4. Email is added to the subscriber list
5. Welcome email automation triggers

This increases:
- Email list growth (lead capture)
- Average perceived value (free bonus)
- Cross-selling (digital → physical and vice versa)

---

## Testing Checklist

- [ ] Pop-up appears after 10 seconds on any page
- [ ] Pop-up appears on mouse exit-intent (desktop)
- [ ] Pop-up doesn't reappear after dismissal (7-day cooldown)
- [ ] Pop-up doesn't appear for existing subscribers
- [ ] Email is stored in localStorage
- [ ] Email is sent to your email platform API
- [ ] Welcome email is triggered automatically
- [ ] Download link works in both pop-up success state and welcome email
- [ ] TROPICAL10 discount code works at checkout
- [ ] Product bundle bar appears on Buy Fruits page
- [ ] Blog articles have "Download Full Ebook" CTA at bottom

---

✅ Email automation is ready for IslandFruitGuide.
