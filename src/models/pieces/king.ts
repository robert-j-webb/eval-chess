import Piece from './piece';

export default class King extends Piece {
  public getIconUrl() {
    return this.player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
  }

  public isMovePossible(src, dest) {
    return (
      src - 9 === dest ||
      src - 8 === dest ||
      src - 7 === dest ||
      src + 1 === dest ||
      src + 9 === dest ||
      src + 8 === dest ||
      src + 7 === dest ||
      src - 1 === dest
    );
  }

  /**
   * always returns empty array because of one step
   * @return {[]}
   */
  public getSrcToDestPath(src, dest) {
    return [];
  }
}
