import Piece from './piece';

export default class Bishop extends Piece {
  public getIconUrl() {
    return this.player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';
  }

  public isMovePossible(src, dest) {
    return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0;
  }

  /**
   * get path between src and dest (src and dest exclusive)
   */
  public getSrcToDestPath(src: number, dest: number): number[] {
    const path: number[] = [];
    let pathStart: number;
    let pathEnd;
    let incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else {
      incrementBy = 7;
      pathStart += 7;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}
