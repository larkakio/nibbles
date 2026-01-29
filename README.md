# Nibbles Mini App

Classic Nibbles (Snake) game for [Base](https://base.org) and [Farcaster](https://farcaster.xyz) mini app platforms.

## Stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Framer Motion**
- **@farcaster/miniapp-sdk** for Farcaster/Base embedding

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub and import the repo in [Vercel](https://vercel.com).
2. Set env vars: `NEXT_PUBLIC_APP_URL` = your deployment URL (e.g. `https://nibbles.vercel.app`).
3. Turn off **Deployment Protection** (Settings → Deployment Protection) so the manifest is publicly reachable.
4. Get **Account Association** from [Base Build](https://www.base.dev/preview?tab=account): paste your app URL, verify, copy the `accountAssociation` object.
5. Add to Vercel env: `FARCASTER_ACCOUNT_HEADER`, `FARCASTER_ACCOUNT_PAYLOAD`, `FARCASTER_ACCOUNT_SIGNATURE` (from the copied object).
6. Redeploy. Validate at [base.dev/preview](https://base.dev/preview) and [Farcaster mini app preview](https://farcaster.xyz/~/developers/mini-apps/preview).

## Assets

- **public/icon.png** – 1024×1024 app icon (no transparency).
- **public/hero-image.png** – 1200×630 embed/hero image.
- Optional: **screenshot-1.png**, **screenshot-2.png** (portrait 1284×2778) for store listing.

## Controls

- **Mobile:** Swipe to move, tap to pause.
- **Desktop:** Arrow keys to move, Space to pause.

## Docs

- [Base Mini Apps – Create new mini app](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Base Featured Guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview)
