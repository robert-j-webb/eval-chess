import Bishop from '../models/pieces/bishop';
import King from '../models/pieces/king';
import Knight from '../models/pieces/knight';
import Pawn from '../models/pieces/pawn';
import Piece from '../models/pieces/piece';
import Queen from '../models/pieces/queen';
import Rook from '../models/pieces/rook';

export default function initializeChessBoard(): Piece[] {
  const squares = Array(64).fill(null);
  let i = 0;
  Array(8)
    .fill(0)
    .forEach((_, idx) => {
      const offset = idx + 8;
      squares[offset] = new Pawn(2, i++);
      squares[offset + 40] = new Pawn(1, i++);
    });
  squares[0] = new Rook(2, i++);
  squares[7] = new Rook(2, i++);
  squares[56] = new Rook(1, i++);
  squares[63] = new Rook(1, i++);

  squares[1] = new Knight(2, i++);
  squares[6] = new Knight(2, i++);
  squares[57] = new Knight(1, i++);
  squares[62] = new Knight(1, i++);

  squares[2] = new Bishop(2, i++);
  squares[5] = new Bishop(2, i++);
  squares[58] = new Bishop(1, i++);
  squares[61] = new Bishop(1, i++);

  squares[3] = new Queen(2, i++);
  squares[4] = new King(2, i++);

  squares[59] = new Queen(1, i++);
  squares[60] = new King(1, i++);

  return squares;
}
