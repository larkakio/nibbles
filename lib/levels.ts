import type { Position } from '@/types/game';

export interface LevelConfig {
  id: number;
  walls: Position[];
  speedMultiplier: number;
  numbersToEat: number;
}

function borderWalls(cols: number, rows: number): Position[] {
  const w: Position[] = [];
  for (let x = 0; x < cols; x++) {
    w.push({ x, y: 0 });
    w.push({ x, y: rows - 1 });
  }
  for (let y = 1; y < rows - 1; y++) {
    w.push({ x: 0, y });
    w.push({ x: cols - 1, y });
  }
  return w;
}

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    walls: borderWalls(20, 16),
    speedMultiplier: 1,
    numbersToEat: 5,
  },
  {
    id: 2,
    walls: [
      ...borderWalls(20, 16),
      { x: 10, y: 4 },
      { x: 10, y: 5 },
      { x: 10, y: 6 },
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
      { x: 5, y: 7 },
      { x: 5, y: 8 },
      { x: 15, y: 7 },
      { x: 15, y: 8 },
    ],
    speedMultiplier: 1.12,
    numbersToEat: 7,
  },
  {
    id: 3,
    walls: [
      ...borderWalls(20, 16),
      { x: 5, y: 3 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
      { x: 5, y: 12 },
      { x: 6, y: 12 },
      { x: 7, y: 12 },
      { x: 13, y: 3 },
      { x: 14, y: 3 },
      { x: 15, y: 3 },
      { x: 13, y: 12 },
      { x: 14, y: 12 },
      { x: 15, y: 12 },
      { x: 10, y: 6 },
      { x: 10, y: 7 },
      { x: 10, y: 8 },
      { x: 10, y: 9 },
    ],
    speedMultiplier: 1.25,
    numbersToEat: 10,
  },
];

export function getLevel(id: number): LevelConfig | undefined {
  return LEVELS.find((l) => l.id === id) ?? LEVELS[LEVELS.length - 1];
}
