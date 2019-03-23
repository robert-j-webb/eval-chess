export default class Piece {
  public player: number;
  public style: { backgroundImage: string; backgroundColor?: string };
  public idx: number;
  constructor(player, idx: number) {
    this.player = player;
    this.style = {
      backgroundImage: "url('" + this.getIconUrl() + "')"
    };
    this.idx = idx;
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

  public getIconUrl(): string {
    return '';
  }

  public clone(): Piece {
    const data = JSON.parse(JSON.stringify(this));
    data.isMovePossible = this.isMovePossible;
    data.getSrcToDestPath = this.getSrcToDestPath;
    data.clone = this.clone;
    return data;
  }
}
