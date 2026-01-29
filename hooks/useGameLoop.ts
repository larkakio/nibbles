'use client';

import { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { getSpeedMs } from '@/lib/gameLogic';

export function useGameLoop() {
  const { gameState, level, dispatch } = useGame();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const speedMs = getSpeedMs(level);
    intervalRef.current = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, speedMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameState, level, dispatch]);
}
