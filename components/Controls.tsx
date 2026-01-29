'use client';

import { useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';
import type { Direction } from '@/types/game';

export function Controls() {
  const { setDirection, gameState, pause, resume } = useGame();

  const onSwipe = useCallback(
    (direction: Direction) => {
      if (gameState === 'PLAYING') setDirection(direction);
    },
    [gameState, setDirection]
  );

  const { handleTouchStart, handleTouchEnd } = useSwipeGestures({ onSwipe });

  const handleTap = useCallback(() => {
    if (gameState === 'PLAYING') pause();
    else if (gameState === 'PAUSED') resume();
  }, [gameState, pause, resume]);

  return (
    <div
      className="touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          handleTap();
        }
      }}
      aria-label="Game controls: tap to pause, swipe to move"
    />
  );
}
