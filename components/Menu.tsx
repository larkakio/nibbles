'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export function Menu() {
  const { startGame, highScore } = useGame();

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-black px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-electric-cyan via-cyber-purple to-neon-green bg-clip-text text-transparent mb-2">
        NIBBLES
      </h1>
      <p className="font-mono text-white/70 text-sm mb-8 text-center">
        Classic Snake, Reimagined
      </p>
      <p className="font-mono text-white/50 text-xs mb-6">
        High Score: <span className="text-neon-green">{highScore}</span>
      </p>
      <motion.button
        className="min-w-[180px] min-h-[48px] px-8 py-4 rounded-xl font-orbitron font-bold text-space-black bg-gradient-to-r from-electric-cyan to-neon-green hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-electric-cyan/20"
        onClick={startGame}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Play
      </motion.button>
      <p className="font-mono text-white/40 text-xs mt-8 text-center max-w-[280px]">
        Swipe to move • Tap to pause
      </p>
    </motion.div>
  );
}
