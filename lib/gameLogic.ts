import type { Direction, Position } from '@/types/game';
import {
  GRID_COLS,
  GRID_ROWS,
  BASE_SPEED_MS,
  SPEED_INCREASE_PER_LEVEL,
  SCORE_PER_NUMBER_BASE,
  LEVEL_COMPLETION_BONUS,
} from './constants';
import { getLevel } from './levels';
import {
  snakeHitWall,
  snakeHitSelf,
  snakeAteNumber,
} from './collision';

export function nextHead(snake: Position[], direction: Direction): Position {
  const head = snake[0];
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
}

export function getSpeedMs(level: number): number {
  const config = getLevel(level);
  const mult = config?.speedMultiplier ?? 1;
  return Math.max(50, Math.floor(BASE_SPEED_MS / mult));
}

export function scoreForNumber(
  numberValue: number,
  level: number
): number {
  return numberValue * level * SCORE_PER_NUMBER_BASE;
}

export function levelCompletionBonus(level: number): number {
  return LEVEL_COMPLETION_BONUS * level;
}

export function randomEmptyPosition(
  snake: Position[],
  walls: Position[]
): Position {
  const occupied = new Set(snake.concat(walls).map((p) => `${p.x},${p.y}`));
  let x: number, y: number;
  let attempts = 0;
  do {
    x = Math.floor(Math.random() * GRID_COLS);
    y = Math.floor(Math.random() * GRID_ROWS);
    attempts++;
  } while (occupied.has(`${x},${y}`) && attempts < 500);
  return { x, y };
}

export function randomNumber1To9(): number {
  return Math.floor(Math.random() * 9) + 1;
}

export function checkCollisions(
  head: Position,
  body: Position[],
  walls: Position[],
  numberPos: Position | null
): { wall: boolean; self: boolean; ateNumber: boolean } {
  return {
    wall: snakeHitWall(head, walls, GRID_COLS, GRID_ROWS),
    self: snakeHitSelf(head, body),
    ateNumber: snakeAteNumber(head, numberPos),
  };
}
