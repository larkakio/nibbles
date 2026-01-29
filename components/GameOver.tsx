'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export function GameOver() {
  const { score, highScore, restartGame, gameState } = useGame();
  if (gameState !== 'GAME_OVER') return null;

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-black/95 px-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="font-orbitron text-2xl text-wall-red mb-2">Game Over</h2>
      <p className="font-mono text-white/80 mb-1">Score: <span className="text-neon-green">{score}</span></p>
      <p className="font-mono text-white/60 text-sm mb-6">Best: {highScore}</p>
      <motion.button
        className="min-w-[160px] min-h-[48px] px-6 py-3 rounded-xl font-orbitron font-bold text-space-black bg-neon-green hover:opacity-90 active:scale-95"
        onClick={restartGame}
        whileTap={{ scale: 0.98 }}
      >
        Play Again
      </motion.button>
    </motion.div>
  );
}
