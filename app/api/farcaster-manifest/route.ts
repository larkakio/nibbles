import { NextResponse } from 'next/server';

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nibbles.example.com';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: process.env.FARCASTER_ACCOUNT_HEADER || '',
      payload: process.env.FARCASTER_ACCOUNT_PAYLOAD || '',
      signature: process.env.FARCASTER_ACCOUNT_SIGNATURE || '',
    },
    miniapp: {
      version: '1',
      name: 'Nibbles',
      homeUrl: `${ROOT_URL}/`,
      iconUrl: `${ROOT_URL}/icon.png`,
      imageUrl: `${ROOT_URL}/hero-image.png`,
      buttonTitle: 'Play Nibbles',
      splashImageUrl: `${ROOT_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0a0f',
      webhookUrl: `${ROOT_URL}/api/webhook`,
      subtitle: 'Classic Snake, Reimagined',
      description:
        'Navigate the neon grid in this futuristic remake of the classic QBasic Nibbles game. Eat numbers, grow your snake, avoid walls!',
      screenshotUrls: [`${ROOT_URL}/screenshot-1.png`, `${ROOT_URL}/screenshot-2.png`],
      primaryCategory: 'games',
      tags: ['snake', 'retro', 'arcade', 'puzzle'],
      requiredChains: ['eip155:8453'],
    },
  };

  return NextResponse.json(manifest, {
    headers: { 'Content-Type': 'application/json' },
  });
}
