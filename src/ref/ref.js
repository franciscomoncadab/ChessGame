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
        if (piece) {
          return true;
        }
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
        if (this.canAttackEnemy(x, y, initialBoard, teamType)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.canAttackEnemy(x, y, initialBoard, teamType)) {
          return true;
        }
      }
    } else if (pieceType === "knight") {
      console.log("u can move knight");

      for(let i = -1; i < 2; i += 2){
          if (y - py === 2 * i) {
               if (x - px === -1) {
                 console.log(" u can move top or bottom left");
               }
               if (x - px === 1) {
                 console.log(" u can move top or bottom right");
               }
             }

             if (x - px === 2 * i) {
               if (y - py === -1) {
                 console.log(" u can move right or left bottom");
               }
               if (y - py === 1) {
                 console.log(" u can move right or left top");
               }
             }
      }     
    }
    return false;
  }
}
