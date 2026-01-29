'use client';

import { useGame } from '@/context/GameContext';

export function PauseButton() {
  const { gameState, pause, resume } = useGame();

  if (gameState !== 'PLAYING' && gameState !== 'PAUSED') return null;

  const isPaused = gameState === 'PAUSED';

  return (
    <button
      type="button"
      onClick={() => (isPaused ? resume() : pause())}
      onTouchEnd={(e) => e.preventDefault()}
      className="min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg font-mono text-sm bg-cyber-purple/60 hover:bg-cyber-purple/80 active:bg-cyber-purple text-white border border-cyber-purple/60 touch-manipulation"
      style={{ touchAction: 'manipulation' }}
      aria-label={isPaused ? 'Продовжити' : 'Пауза'}
    >
      {isPaused ? '▶' : '⏸'}
    </button>
  );
}
