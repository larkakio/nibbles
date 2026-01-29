'use client';

import { useCallback } from 'react';
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK';

const SHARE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export function ShareButton() {
  const { sdk } = useFarcasterSDK();

  const handleShare = useCallback(() => {
    if (sdk?.actions?.openUrl) {
      sdk.actions.openUrl(SHARE_URL).catch(() => {
        if (typeof window !== 'undefined' && window.navigator?.share) {
          window.navigator.share({ url: SHARE_URL, title: 'Nibbles' }).catch(() => {});
        }
      });
    } else if (typeof window !== 'undefined' && window.navigator?.share) {
      window.navigator.share({ url: SHARE_URL, title: 'Nibbles' }).catch(() => {});
    }
  }, [sdk]);

  return (
    <button
      type="button"
      onClick={handleShare}
      className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg font-mono text-sm bg-cyber-purple/80 text-white hover:bg-cyber-purple active:scale-95"
    >
      Share
    </button>
  );
}
