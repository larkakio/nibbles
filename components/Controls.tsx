'use client';

import { useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';
import type { Direction } from '@/types/game';

export function Controls() {
  const { setDirection, gameState } = useGame();

  const onSwipe = useCallback(
    (direction: Direction) => {
      if (gameState === 'PLAYING') setDirection(direction);
    },
    [gameState, setDirection]
  );

  const { handleTouchStart, handleTouchEnd } = useSwipeGestures({ onSwipe });

  const prevent = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className="touch-none select-none w-full h-full"
      style={{ touchAction: 'none' }}
      onTouchStart={(e) => {
        handleTouchStart(e);
        prevent(e);
      }}
      onTouchEnd={(e) => {
        handleTouchEnd(e);
        prevent(e);
      }}
      onTouchMove={prevent}
      role="presentation"
      aria-label="Swipe to change direction"
    />
  );
}
