'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export function PauseOverlay() {
  const { resume, gameState } = useGame();
  if (gameState !== 'PAUSED') return null;

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="font-orbitron text-2xl text-electric-cyan mb-6">Paused</h2>
      <motion.button
        className="min-w-[160px] min-h-[48px] px-6 py-3 rounded-xl font-orbitron font-bold text-space-black bg-electric-cyan hover:opacity-90 active:scale-95"
        onClick={resume}
        whileTap={{ scale: 0.98 }}
      >
        Resume
      </motion.button>
    </motion.div>
  );
}
