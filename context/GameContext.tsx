'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { Direction, GameState, Position } from '@/types/game';
import { LEVELS, getLevel } from '@/lib/levels';
import { INITIAL_SNAKE, INITIAL_DIRECTION, GRID_COLS, GRID_ROWS } from '@/lib/constants';
import {
  nextHead,
  getSpeedMs,
  scoreForNumber,
  levelCompletionBonus,
  randomEmptyPosition,
  randomNumber1To9,
  checkCollisions,
} from '@/lib/gameLogic';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface GameStateSlice {
  gameState: GameState;
  score: number;
  level: number;
  snake: Position[];
  direction: Direction;
  nextDirection: Direction;
  numberPosition: Position | null;
  numberValue: number | null;
  numbersEatenThisLevel: number;
  walls: Position[];
}

type Action =
  | { type: 'SET_STATE'; payload: GameState }
  | { type: 'SET_DIRECTION'; payload: Direction }
  | { type: 'TICK' }
  | { type: 'RESET' }
  | { type: 'RESTART' }
  | { type: 'SPAWN_NUMBER' }
  | { type: 'START_LEVEL'; level: number }
  | { type: 'SET_HIGH_SCORE'; payload: number };

function getWalls(levelId: number): Position[] {
  const config = getLevel(levelId);
  return config?.walls ?? LEVELS[0].walls;
}

function getNumbersToEat(levelId: number): number {
  const config = getLevel(levelId);
  return config?.numbersToEat ?? 5;
}

function initialSnake(): Position[] {
  return INITIAL_SNAKE.map((p) => ({ ...p }));
}

function reducer(state: GameStateSlice, action: Action): GameStateSlice {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, gameState: action.payload };
    case 'SET_DIRECTION':
      return { ...state, nextDirection: action.payload };
    case 'START_LEVEL': {
      const level = action.level;
      const walls = getWalls(level);
      const snake = initialSnake();
      const occupied = new Set(snake.concat(walls).map((p) => `${p.x},${p.y}`));
      let numPos: Position | null = null;
      for (let i = 0; i < 100; i++) {
        const x = Math.floor(Math.random() * GRID_COLS);
        const y = Math.floor(Math.random() * GRID_ROWS);
        if (!occupied.has(`${x},${y}`)) {
          numPos = { x, y };
          break;
        }
      }
      return {
        ...state,
        level,
        walls,
        snake,
        direction: INITIAL_DIRECTION,
        nextDirection: INITIAL_DIRECTION,
        numberPosition: numPos,
        numberValue: numPos ? randomNumber1To9() : null,
        numbersEatenThisLevel: 0,
        gameState: 'PLAYING',
      };
    }
    case 'SPAWN_NUMBER': {
      const pos = randomEmptyPosition(state.snake, state.walls);
      return {
        ...state,
        numberPosition: pos,
        numberValue: randomNumber1To9(),
      };
    }
    case 'TICK': {
      if (state.gameState !== 'PLAYING') return state;
      const head = nextHead(state.snake, state.nextDirection);
      const collisions = checkCollisions(
        head,
        state.snake,
        state.walls,
        state.numberPosition
      );

      if (collisions.wall || collisions.self) {
        return { ...state, gameState: 'GAME_OVER' };
      }

      const newSnake = [head, ...state.snake];
      let newScore = state.score;
      let newNumbersEaten = state.numbersEatenThisLevel;
      let newNumberPosition: Position | null = state.numberPosition;
      let newNumberValue: number | null = state.numberValue;
      let newLevel = state.level;
      let newWalls = state.walls;
      let newGameState: GameState = 'PLAYING';

      if (collisions.ateNumber && state.numberValue != null) {
        newScore += scoreForNumber(state.numberValue, state.level);
        newNumbersEaten += 1;
        const toEat = getNumbersToEat(state.level);
        if (newNumbersEaten >= toEat) {
          newScore += levelCompletionBonus(state.level);
          newLevel = state.level + 1;
          const nextLevelConfig = getLevel(newLevel);
          if (nextLevelConfig) {
            newWalls = nextLevelConfig.walls;
            newGameState = 'LEVEL_COMPLETE';
            return {
              ...state,
              score: newScore,
              level: newLevel,
              numbersEatenThisLevel: 0,
              snake: initialSnake(),
              direction: INITIAL_DIRECTION,
              nextDirection: INITIAL_DIRECTION,
              walls: newWalls,
              gameState: newGameState,
              numberPosition: randomEmptyPosition(initialSnake(), newWalls),
              numberValue: randomNumber1To9(),
            };
          }
        } else {
          const pos = randomEmptyPosition(newSnake, state.walls);
          newNumberPosition = pos;
          newNumberValue = randomNumber1To9();
        }
      } else {
        newSnake.pop();
      }

      return {
        ...state,
        snake: newSnake,
        direction: state.nextDirection,
        score: newScore,
        numbersEatenThisLevel: newNumbersEaten,
        numberPosition: newNumberPosition,
        numberValue: newNumberValue,
      };
    }
    case 'RESET': {
      const level = 1;
      const walls = getWalls(level);
      const snake = initialSnake();
      const numPos = randomEmptyPosition(snake, walls);
      return {
        gameState: 'MENU' as GameState,
        score: 0,
        level: 1,
        snake,
        direction: INITIAL_DIRECTION,
        nextDirection: INITIAL_DIRECTION,
        numberPosition: numPos,
        numberValue: numPos ? randomNumber1To9() : null,
        numbersEatenThisLevel: 0,
        walls,
      };
    }
    case 'RESTART': {
      const level = 1;
      const walls = getWalls(level);
      const snake = initialSnake();
      const numPos = randomEmptyPosition(snake, walls);
      return {
        gameState: 'PLAYING' as GameState,
        score: 0,
        level: 1,
        snake,
        direction: INITIAL_DIRECTION,
        nextDirection: INITIAL_DIRECTION,
        numberPosition: numPos,
        numberValue: numPos ? randomNumber1To9() : null,
        numbersEatenThisLevel: 0,
        walls,
      };
    }
    default:
      return state;
  }
}

const initialState: GameStateSlice = {
  gameState: 'MENU',
  score: 0,
  level: 1,
  snake: initialSnake(),
  direction: INITIAL_DIRECTION,
  nextDirection: INITIAL_DIRECTION,
  numberPosition: null,
  numberValue: null,
  numbersEatenThisLevel: 0,
  walls: getWalls(1),
};

interface GameContextValue extends GameStateSlice {
  highScore: number;
  setDirection: (d: Direction) => void;
  setGameState: (s: GameState) => void;
  resetGame: () => void;
  restartGame: () => void;
  startGame: () => void;
  pause: () => void;
  resume: () => void;
  advanceFromLevelComplete: () => void;
  dispatch: React.Dispatch<Action>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { highScore, setHighScore } = useLocalStorage();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDirection = useCallback((d: Direction) => {
    dispatch({ type: 'SET_DIRECTION', payload: d });
  }, []);

  const setGameState = useCallback((s: GameState) => {
    dispatch({ type: 'SET_STATE', payload: s });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const restartGame = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_LEVEL', level: 1 });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'SET_STATE', payload: 'PAUSED' });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: 'SET_STATE', payload: 'PLAYING' });
  }, []);

  const advanceFromLevelComplete = useCallback(() => {
    dispatch({ type: 'SET_STATE', payload: 'PLAYING' });
  }, []);

  useEffect(() => {
    if (state.gameState === 'GAME_OVER' && state.score > highScore) {
      setHighScore(state.score);
    }
  }, [state.gameState, state.score, highScore, setHighScore]);

  const value: GameContextValue = {
    ...state,
    highScore,
    setDirection,
    setGameState,
    resetGame,
    restartGame,
    startGame,
    pause,
    resume,
    advanceFromLevelComplete,
    dispatch,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
