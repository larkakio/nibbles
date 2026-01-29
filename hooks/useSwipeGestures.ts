'use client';

import { useCallback, useRef } from 'react';
import type { Direction } from '@/types/game';
import { MIN_SWIPE_DISTANCE, TOUCH_DEADZONE_PX } from '@/lib/constants';

interface SwipeHandlers {
  onSwipe: (direction: Direction) => void;
}

export function useSwipeGestures({ onSwipe }: SwipeHandlers) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touchStart.current = { x: t.clientX, y: t.clientY };
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t || !touchStart.current) return;
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;

      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (absX < MIN_SWIPE_DISTANCE && absY < MIN_SWIPE_DISTANCE) return;

      if (absX > absY) {
        onSwipe(dx > 0 ? 'RIGHT' : 'LEFT');
      } else {
        onSwipe(dy > 0 ? 'DOWN' : 'UP');
      }
    },
    [onSwipe]
  );

  return { handleTouchStart, handleTouchEnd };
}

export function isInDeadZone(clientX: number, clientY: number, rect: DOMRect): boolean {
  return (
    clientX < rect.left + TOUCH_DEADZONE_PX ||
    clientX > rect.right - TOUCH_DEADZONE_PX ||
    clientY < rect.top + TOUCH_DEADZONE_PX ||
    clientY > rect.bottom - TOUCH_DEADZONE_PX
  );
}
