import Piece from './piece';

export default class Pawn extends Piece {
  public initialPositions: number[][] = [
    [48, 49, 50, 51, 52, 53, 54, 55],
    [8, 9, 10, 11, 12, 13, 14, 15]
  ];
  public getIconUrl() {
    return this.player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';
  }

  public isMovePossible(src, dest, isDestEnemyOccupied) {
    if (this.player === 1) {
      if (
        (dest === src - 8 && !isDestEnemyOccupied) ||
        (dest === src - 16 && this.initialPositions[0].indexOf(src) !== -1)
      ) {
        return true;
      } else if (
        isDestEnemyOccupied &&
        (dest === src - 9 || dest === src - 7)
      ) {
        return true;
      }
    } else if (this.player === 2) {
      if (
        (dest === src + 8 && !isDestEnemyOccupied) ||
        (dest === src + 16 && this.initialPositions[1].indexOf(src) !== -1)
      ) {
        return true;
      } else if (
        isDestEnemyOccupied &&
        (dest === src + 9 || dest === src + 7)
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * returns array of one if pawn moves two steps, else returns empty array
   */
  public getSrcToDestPath(src: number, dest: number): number[] {
    if (dest === src - 16) {
      return [src - 8];
    } else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  }
}
