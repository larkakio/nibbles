import type { Position } from '@/types/game';

export function positionEquals(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

export function snakeHitWall(
  head: Position,
  walls: Position[],
  cols: number,
  rows: number
): boolean {
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    return true;
  }
  return walls.some((w) => positionEquals(head, w));
}

export function snakeHitSelf(head: Position, body: Position[]): boolean {
  return body.some((seg, i) => i > 0 && positionEquals(head, seg));
}

export function snakeAteNumber(
  head: Position,
  numberPos: Position | null
): boolean {
  return numberPos !== null && positionEquals(head, numberPos);
}
