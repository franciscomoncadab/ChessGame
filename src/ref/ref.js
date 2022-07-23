import { pawnMove } from "./moves/pawnMove";
import { knightMove } from "./moves/knightMove";
import { bishopMove } from "./moves/bishopMove";
import { rookMove } from "./moves/rookMove";
import { queenMove } from "./moves/queenMove";
import { kingMove } from "./moves/kingMove";

export default class referee {
  isEnPassant(px, py, x, y, pieceType, teamType, initialBoard) {
    const pawnDirection = teamType === "w" ? 1 : -1;

    if (pieceType === "pawn") {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = initialBoard.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }
  
  isValidMove(px, py, x, y, pieceType, teamType, initialBoard) {
    let validMove = false;
    switch (pieceType) {
      case (pieceType = "pawn"):
        validMove = pawnMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "knight"):
        validMove = knightMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "bishop"):
        validMove = bishopMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "rook"):
        validMove = rookMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "queen"):
        validMove = queenMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "king"):
        validMove = kingMove(px, py, x, y, teamType, initialBoard);
    }
    return validMove;
  }
}
