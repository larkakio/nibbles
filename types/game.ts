export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameState =
  | 'MENU'
  | 'LOADING'
  | 'PLAYING'
  | 'PAUSED'
  | 'GAME_OVER'
  | 'LEVEL_COMPLETE';

export interface Position {
  x: number;
  y: number;
}

export interface Cell {
  x: number;
  y: number;
  type: 'empty' | 'snake' | 'wall' | 'number';
  value?: number;
  segmentIndex?: number;
}

export interface LevelConfig {
  id: number;
  walls: Position[];
  speedMultiplier: number;
  numbersToEat: number;
}

export interface GameContextValue {
  state: GameState;
  score: number;
  level: number;
  highScore: number;
  snake: Position[];
  direction: Direction;
  nextDirection: Direction;
  numberPosition: Position | null;
  numberValue: number | null;
  gridSize: { cols: number; rows: number };
  setDirection: (d: Direction) => void;
  setState: (s: GameState) => void;
  resetGame: () => void;
  pause: () => void;
  resume: () => void;
}
