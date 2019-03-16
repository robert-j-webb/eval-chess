import Piece from './piece';

export default class Rook extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg'
    );
  }

  public isMovePossible(src, dest) {
    const mod = src % 8;
    const diff = 8 - mod;
    return (
      Math.abs(src - dest) % 8 === 0 || (dest >= src - mod && dest < src + diff)
    );
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
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}
