"use client";

import { useAccount } from "wagmi";

export function useFarcasterSDK() {
  const { address } = useAccount();

  const user = address
    ? {
        fid: 0,
        username: undefined as string | undefined,
        displayName: `${address.slice(0, 6)}…${address.slice(-4)}`,
        pfpUrl: undefined as string | undefined,
      }
    : null;

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sdk = {
    actions: {
      openUrl,
    },
  };

  return { user, openUrl, sdk };
}
