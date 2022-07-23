import { canAttackEnemy, isOccupied } from "./validMoves";


export const pawnMove = (px, py, x, y, teamType, initialBoard) => {
     const specialMove = teamType === "w" ? 1 : 6;
     const pawnDirection = teamType === "w" ? 1 : -1;
 
     if (px === x && py === specialMove && y - py === 2 * pawnDirection) {
       if (
         !isOccupied(x, y, initialBoard) &&
         !isOccupied(x, y - pawnDirection, initialBoard)
       ) {
         return true;
       }
     } else if (px === x && y - py === pawnDirection) {
       if (!isOccupied(x, y, initialBoard)) {
         return true;
       }
     } else if (x - px === -1 && y - py === pawnDirection) {
       if (canAttackEnemy(x, y, initialBoard, teamType)) {
         return true;
       }
     } else if (x - px === 1 && y - py === pawnDirection) {
       if (canAttackEnemy(x, y, initialBoard, teamType)) {
         return true;
       }
     }
     return false;
   }