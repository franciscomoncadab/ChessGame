import { isOccupied, isOccupiedOrCanAttackEnemy } from "./validMoves";

export const queenMove = (px, py, x, y, teamType, initialBoard) => {
     for (let i = 1; i < 8; i++) {
       //Complete movement
       let upOrDown = y < py ? -1 : y > py ? 1 : 0;
       let rightOrLeft = x < px ? -1 : x > px ? 1 : 0;
       let passX = px + i * rightOrLeft;
       let passY = py + i * upOrDown;
       if (passX === x && passY === y) {
         if (
           isOccupiedOrCanAttackEnemy(passX, passY, initialBoard, teamType)
         ) {
           return true;
         }
       } else {
         if (isOccupied(passX, passY, initialBoard)) {
           break;
         }
       }
     }
     return false;
   };