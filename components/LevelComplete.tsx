'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export function LevelComplete() {
  const { level, advanceFromLevelComplete, gameState } = useGame();
  if (gameState !== 'LEVEL_COMPLETE') return null;

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-black/90 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="font-orbitron text-2xl text-neon-green mb-2">Level Complete!</h2>
      <p className="font-mono text-white/70 mb-6">Level {level - 1} cleared</p>
      <motion.button
        className="min-w-[160px] min-h-[48px] px-6 py-3 rounded-xl font-orbitron font-bold text-space-black bg-electric-cyan hover:opacity-90 active:scale-95"
        onClick={advanceFromLevelComplete}
        whileTap={{ scale: 0.98 }}
      >
        Next Level
      </motion.button>
    </motion.div>
  );
}
