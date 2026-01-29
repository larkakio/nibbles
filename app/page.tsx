'use client';

import { GameProvider, useGame } from '@/context/GameContext';
import { FarcasterReady } from '@/components/FarcasterReady';
import { GameBoard } from '@/components/GameBoard';
import { HUD } from '@/components/HUD';
import { Menu } from '@/components/Menu';
import { PauseOverlay } from '@/components/PauseOverlay';
import { GameOver } from '@/components/GameOver';
import { LevelComplete } from '@/components/LevelComplete';
import { Controls } from '@/components/Controls';
import { ShareButton } from '@/components/ShareButton';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useKeyboard } from '@/hooks/useKeyboard';

function GameContent() {
  const { gameState } = useGame();
  useGameLoop();
  useKeyboard();

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center p-4 pt-16 scanlines">
      <FarcasterReady />
      <HUD />
      {gameState === 'MENU' && <Menu />}
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative">
          <GameBoard />
          <div className="absolute inset-0 rounded-xl">
            <Controls />
          </div>
        </div>
      </div>
      <PauseOverlay />
      <GameOver />
      <LevelComplete />
      <div className="absolute bottom-6 right-6">
        <ShareButton />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
