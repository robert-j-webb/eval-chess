import Bishop from '../models/pieces/bishop';
import King from '../models/pieces/king';
import Knight from '../models/pieces/knight';
import Pawn from '../models/pieces/pawn';
import Piece from '../models/pieces/piece';
import Queen from '../models/pieces/queen';
import Rook from '../models/pieces/rook';

export default function initializeChessBoard(): Piece[] {
  const squares = Array(64).fill(null);
  let k = 0;
  for (let i = 8; i < 16; i++) {
    squares[i] = new Pawn(2, k++);
    squares[i + 40] = new Pawn(1, k++);
  }
  squares[0] = new Rook(2, k++);
  squares[7] = new Rook(2, k++);
  squares[56] = new Rook(1, k++);
  squares[63] = new Rook(1, k++);

  squares[1] = new Knight(2, k++);
  squares[6] = new Knight(2, k++);
  squares[57] = new Knight(1, k++);
  squares[62] = new Knight(1, k++);

  squares[2] = new Bishop(2, k++);
  squares[5] = new Bishop(2, k++);
  squares[58] = new Bishop(1, k++);
  squares[61] = new Bishop(1, k++);

  squares[3] = new Queen(2, k++);
  squares[4] = new King(2, k++);

  squares[59] = new Queen(1, k++);
  squares[60] = new King(1, k++);

  return squares;
}
