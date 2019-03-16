export default class Piece {
  public player: number;
  public style: { backgroundImage: string; backgroundColor: string };
  constructor(player, iconUrl) {
    this.player = player;
    this.style = {
      backgroundImage: "url('" + iconUrl + "')",
      backgroundColor: 'transparent'
    };
  }
  public getSrcToDestPath(src: number, dest: number): number[] {
    return [];
  }
  public isMovePossible(
    src: number,
    dest: number,
    isDestEnemyOccupied?: boolean
  ): boolean {
    return false;
  }

  public clone(): Piece {
    const data = JSON.parse(JSON.stringify(this));
    data.isMovePossible = this.isMovePossible;
    data.getSrcToDestPath = this.getSrcToDestPath;
    data.clone = this.clone;
    return data;
  }
}
