'use client';

import { useGame } from '@/context/GameContext';
import { PauseButton } from '@/components/PauseButton';

export function HUD() {
  const { score, level, highScore, gameState } = useGame();
  if (gameState === 'MENU') return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 py-3 safe-area-inset bg-space-black/80 font-mono text-sm">
      <div className="text-electric-cyan">
        Score: <span className="text-neon-green font-bold">{score}</span>
      </div>
      <div className="text-cyber-purple">
        Level: <span className="font-bold">{level}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white/80">
          Best: <span className="text-neon-green font-bold">{highScore}</span>
        </span>
        <PauseButton />
      </div>
    </div>
  );
}
