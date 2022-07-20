export default class referee {
  isOccupiedOrCanAttackEnemy(x, y, initialBoard, teamType) {
    return (
      !this.isOccupied(x, y, initialBoard) ||
      this.canAttackEnemy(x, y, initialBoard, teamType)
    );
  }

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

  pawnMove(px, py, x, y, teamType, initialBoard) {
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
    return false;
  }

  knightMove(px, py, x, y, teamType, initialBoard) {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        if (y - py === 2 * i) {
          if (x - px === j) {
            if (this.isOccupiedOrCanAttackEnemy(x, y, initialBoard, teamType)) {
              return true;
            }
          }
        }

        if (x - px === 2 * i) {
          if (y - py === j) {
            if (this.isOccupiedOrCanAttackEnemy(x, y, initialBoard, teamType)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  bishopMove(px, py, x, y, teamType, initialBoard) {
    for (let i = 1; i < 8; i++) {
      //up right movement
      if (x > px && y > py) {
        let passX = px + i;
        let passY = py + i;
        if (passX === x && passY === y) {
          if (
            this.isOccupiedOrCanAttackEnemy(
              passX,
              passY,
              initialBoard,
              teamType
            )
          ) {
            return true;
          }
        } else {
          if (this.isOccupied(passX, passY, initialBoard)) {
            break;
          }
        }
      }

      //bottom right movement
      if (x > px && y < py) {
        let passX = px + i;
        let passY = py - i;
        if (passX === x && passY === y) {
          if (
            this.isOccupiedOrCanAttackEnemy(
              passX,
              passY,
              initialBoard,
              teamType
            )
          ) {
            return true;
          }
        } else {
          if (this.isOccupied(passX, passY, initialBoard)) {
            break;
          }
        }
      }

      //Bottom left movement
      if (x < px && y < py) {
        let passX = px - i;
        let passY = py - i;
        if (passX === x && passY === y) {
          if (
            this.isOccupiedOrCanAttackEnemy(
              passX,
              passY,
              initialBoard,
              teamType
            )
          ) {
            return true;
          }
        } else {
          if (this.isOccupied(passX, passY, initialBoard)) {
            break;
          }
        }
      }

      //top left movement
      if (x < px && y > py) {
        let passX = px - i;
        let passY = py + i;
        if (passX === x && passY === y) {
          if (
            this.isOccupiedOrCanAttackEnemy(
              passX,
              passY,
              initialBoard,
              teamType
            )
          ) {
            return true;
          }
        } else {
          if (this.isOccupied(passX, passY, initialBoard)) {
            break;
          }
        }
      }
    }

    return false;
  }

  rookMove(px, py, x, y, teamType, initialBoard) {
    if (px === x) {
      console.log("can move vertically");
      for (let i = 1; i < 8; i++) {
        let upOrDown = y < py ? -1 : 1;
        let passY = py + i * upOrDown;

        if (px === x && passY === y) {
          if (
            this.isOccupiedOrCanAttackEnemy(x, passY, initialBoard, teamType)
          ) {
            return true;
          }
        } else {
          if (this.isOccupied(x, passY, initialBoard)) {
            break;
          }
        }
      }
    }

    if (py === y) {
      console.log("can move horizontally");
      for (let i = 1; i < 8; i++) {
        let rightOrLeft = x < px ? -1 : 1;
        let passX = px + i * rightOrLeft;

        if (passX === x && py === y) {
          if (
            this.isOccupiedOrCanAttackEnemy(passX, y, initialBoard, teamType)
          ) {
            return true;
          }
        } else {
          if (this.isOccupied(passX, y, initialBoard)) {
            break;
          }
        }
      }
    }

    return false;
  }

  isValidMove(px, py, x, y, pieceType, teamType, initialBoard) {
    let validMove = false;
    switch (pieceType) {
      case (pieceType = "pawn"):
        validMove = this.pawnMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "knight"):
        validMove = this.knightMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "bishop"):
        validMove = this.bishopMove(px, py, x, y, teamType, initialBoard);
        break;
      case (pieceType = "rook"):
        validMove = this.rookMove(px, py, x, y, teamType, initialBoard);
    }
    return validMove;
  }
}
