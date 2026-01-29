'use client';

import { useState, useEffect, useCallback } from 'react';

const HIGH_SCORE_KEY = 'nibbles-high-score';

export function useLocalStorage() {
  const [highScore, setHighScoreState] = useState(0);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' && window.localStorage.getItem(HIGH_SCORE_KEY);
      if (raw) {
        const n = parseInt(raw, 10);
        if (!Number.isNaN(n)) setHighScoreState(n);
      }
    } catch {
      // ignore
    }
  }, []);

  const setHighScore = useCallback((score: number) => {
    setHighScoreState((prev) => {
      const next = Math.max(prev, score);
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(HIGH_SCORE_KEY, String(next));
        }
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { highScore, setHighScore };
}
