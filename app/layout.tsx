import type { Metadata } from 'next';
import { Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nibbles-gamma.vercel.app';

const FC_EMBED = {
  version: '1',
  imageUrl: `${ROOT_URL}/hero-image.png`,
  button: {
    title: 'Play Nibbles',
    action: {
      type: 'launch_frame',
      name: 'Nibbles',
      url: `${ROOT_URL}/`,
      splashImageUrl: `${ROOT_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0a0f',
    },
  },
};

export const metadata: Metadata = {
  title: 'Nibbles – Classic Snake, Reimagined',
  description:
    'Navigate the neon grid in this futuristic remake of the classic QBasic Nibbles game. Eat numbers, grow your snake, avoid walls!',
  openGraph: {
    title: 'Nibbles – Classic Snake, Reimagined',
    description:
      'Navigate the neon grid in this futuristic remake of the classic QBasic Nibbles game. Eat numbers, grow your snake, avoid walls!',
    images: [`${ROOT_URL}/hero-image.png`],
    url: ROOT_URL,
  },
  other: {
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
    'base:app_id': process.env.NEXT_PUBLIC_BASE_APP_ID || '697b6753748a9bde7c61abcd',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrains.variable}`}>
      <body className="font-[family-name:var(--font-orbitron)] antialiased bg-space-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
