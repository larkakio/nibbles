'use client';

import { useEffect, useCallback } from 'react';
import type { Direction } from '@/types/game';
import { useGame } from '@/context/GameContext';

export function useKeyboard() {
  const { setDirection, gameState, pause, resume } = useGame();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameState === 'MENU' || gameState === 'GAME_OVER' || gameState === 'LEVEL_COMPLETE') return;
      if (e.key === ' ') {
        e.preventDefault();
        if (gameState === 'PLAYING') pause();
        else if (gameState === 'PAUSED') resume();
        return;
      }
      if (gameState !== 'PLAYING') return;
      const map: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        setDirection(dir);
      }
    },
    [gameState, setDirection, pause, resume]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
