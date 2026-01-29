export const GRID_COLS = 20;
export const GRID_ROWS = 16;
export const CELL_SIZE_PX = 20;
export const BASE_SPEED_MS = 150;
export const SPEED_INCREASE_PER_LEVEL = 0.12;
export const SCORE_PER_NUMBER_BASE = 10;
export const LEVEL_COMPLETION_BONUS = 1000;
export const INITIAL_SNAKE: { x: number; y: number }[] = [
  { x: 10, y: 8 },
  { x: 9, y: 8 },
  { x: 8, y: 8 },
];
export const INITIAL_DIRECTION = 'RIGHT' as const;
export const TOUCH_DEADZONE_PX = 20;
export const MIN_SWIPE_DISTANCE = 24;
