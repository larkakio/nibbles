'use client';

import { useGame } from '@/context/GameContext';
import { CELL_SIZE_PX } from '@/lib/constants';
import { GRID_COLS, GRID_ROWS } from '@/lib/constants';

export function GameBoard() {
  const { snake, walls, numberPosition, numberValue } = useGame();
  const width = GRID_COLS * CELL_SIZE_PX;
  const height = GRID_ROWS * CELL_SIZE_PX;
  return (
    <div
      className="relative rounded-xl overflow-hidden bg-dark-navy border-2 border-electric-cyan/30 shadow-lg shadow-electric-cyan/10"
      style={{ width, height }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,217,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,217,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: `${CELL_SIZE_PX}px ${CELL_SIZE_PX}px`,
        }}
      />
      {/* Walls */}
      {walls.map((w, i) => (
        <div
          key={`w-${i}`}
          className="absolute bg-wall-red border border-red-400/50"
          style={{
            left: w.x * CELL_SIZE_PX + 1,
            top: w.y * CELL_SIZE_PX + 1,
            width: CELL_SIZE_PX - 2,
            height: CELL_SIZE_PX - 2,
          }}
        />
      ))}
      {/* Snake */}
      {snake.map((seg, i) => (
        <div
          key={`s-${i}`}
          className={`absolute rounded-sm transition-none ${
            i === 0
              ? 'bg-gradient-to-br from-electric-cyan to-cyber-purple shadow-lg shadow-electric-cyan/50'
              : 'bg-gradient-to-br from-electric-cyan/90 to-cyber-purple/90'
          }`}
          style={{
            left: seg.x * CELL_SIZE_PX + 2,
            top: seg.y * CELL_SIZE_PX + 2,
            width: CELL_SIZE_PX - 4,
            height: CELL_SIZE_PX - 4,
          }}
        />
      ))}
      {/* Number */}
      {numberPosition != null && numberValue != null && (
        <div
          className="absolute flex items-center justify-center font-mono font-bold text-space-black bg-neon-green rounded border-2 border-neon-green/80 shadow-lg shadow-neon-green/40 text-lg"
          style={{
            left: numberPosition.x * CELL_SIZE_PX + 2,
            top: numberPosition.y * CELL_SIZE_PX + 2,
            width: CELL_SIZE_PX - 4,
            height: CELL_SIZE_PX - 4,
          }}
        >
          {numberValue}
        </div>
      )}
    </div>
  );
}
