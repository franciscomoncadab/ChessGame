import { initialBoard } from "../components/Chessboard/Chessboard";

export default class referee {
  isOccupied(x, y, initialBoard) {
    const piece = initialBoard.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  canAttackEnemy(x, y, initialBoard, teamType) {
    const piece = initialBoard.find(
      (p) => p.x === x && p.y === y && p.teamType !== teamType
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassant(px, py, x, y, pieceType, teamType, initialBoard) {
    const pawnDirection = teamType === "w" ? 1 : -1;

    if (pieceType === "pawn") {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
          const piece = initialBoard.find(
               (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
             );
          return true;        
      } 
    }
    
    return false;
  }

  isValidMove(px, py, x, y, pieceType, teamType, initialBoard) {
    if (pieceType === "pawn") {
      const specialMove = teamType === "w" ? 1 : 6;
      const pawnDirection = teamType === "w" ? 1 : -1;

      if (px === x && py === specialMove && y - py === 2 * pawnDirection) {
        if (
          !this.isOccupied(x, y, initialBoard) &&
          !this.isOccupied(x, y - pawnDirection, initialBoard)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.isOccupied(x, y, initialBoard)) {
          return true;
        }
      } else if (x - px === -1 && y - py === pawnDirection) {
        console.log("I can move this pawn");
        if (this.canAttackEnemy(x, y, initialBoard, teamType)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.canAttackEnemy(x, y, initialBoard, teamType)) {
          return true;
        }
      }
    }
    return false;
  }
}
