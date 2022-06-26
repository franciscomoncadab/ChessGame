import { Piece, PieceFactory } from '../pieces/piece';

export default function initializeChess() {
  const squares = Array(64).fill(null);


  for (let i = 8; i < 16; i++) {
    squares[i] = PieceFactory.newPiece('black', 'pawn');
    squares[i + 40] = PieceFactory.newPiece('white', 'pawn');
  }

  squares[0] = PieceFactory.newPiece('black', 'rook');
  squares[7] = PieceFactory.newPiece('black', 'rook');
  squares[56] = PieceFactory.newPiece('white', 'rook');
  squares[63] = PieceFactory.newPiece('white', 'rook');

  squares[58] = PieceFactory.newPiece('white', 'bishop');
  squares[61] = PieceFactory.newPiece('white', 'bishop');
  squares[2] = PieceFactory.newPiece('black', 'bishop');
  squares[5] = PieceFactory.newPiece('black', 'bishop');

  squares[1] = PieceFactory.newPiece('black', 'knight');
  squares[6] = PieceFactory.newPiece('black', 'knight');
  squares[57] = PieceFactory.newPiece('white', 'knight');
  squares[62] = PieceFactory.newPiece('white', 'knight');

  squares[3] = PieceFactory.newPiece('black', 'queen');
  squares[59] = PieceFactory.newPiece('white', 'queen');

  squares[4] = PieceFactory.newPiece('black', 'king');
  squares[60] = PieceFactory.newPiece('white', 'king');


  return squares;
}