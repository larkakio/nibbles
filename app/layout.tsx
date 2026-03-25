import type { Metadata } from 'next';
import { Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nibbles-gamma.vercel.app';

export const metadata: Metadata = {
  title: 'Nibbles – Classic Snake, Reimagined',
  description:
    'Navigate the neon grid in this futuristic remake of the classic QBasic Nibbles game. Eat numbers, grow your snake, avoid walls!',
  openGraph: {
    title: 'Nibbles – Classic Snake',
    description:
      'Futuristic remake of the classic Nibbles game. Eat numbers, grow your snake, avoid walls!',
    images: [{ url: `${ROOT_URL}/hero-image.png`, width: 1200, height: 630 }],
    url: ROOT_URL,
  },
  other: {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
