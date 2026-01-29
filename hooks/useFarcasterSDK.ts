'use client';

import { useEffect, useState } from 'react';

interface FarcasterUser {
  username?: string;
  displayName?: string;
}

export function useFarcasterSDK() {
  const [sdk, setSDK] = useState<{ context: Promise<{ user?: FarcasterUser }>; actions?: { openUrl: (url: string) => Promise<void> } } | null>(null);
  const [user, setUser] = useState<FarcasterUser | null>(null);

  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then((m) => {
        setSDK(m.sdk as unknown as typeof sdk);
        m.sdk.context
          .then((ctx: { user?: FarcasterUser }) => setUser(ctx?.user ?? null))
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  return { sdk, user };
}
