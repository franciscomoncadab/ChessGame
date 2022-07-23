import { isOccupiedOrCanAttackEnemy } from "./validMoves";

export const knightMove = (px, py, x, y, teamType, initialBoard) => {
     for (let i = -1; i < 2; i += 2) {
       for (let j = -1; j < 2; j += 2) {
         if (y - py === 2 * i) {
           if (x - px === j) {
             if (isOccupiedOrCanAttackEnemy(x, y, initialBoard, teamType)) {
               return true;
             }
           }
         }
 
         if (x - px === 2 * i) {
           if (y - py === j) {
             if (isOccupiedOrCanAttackEnemy(x, y, initialBoard, teamType)) {
               return true;
             }
           }
         }
       }
     }
     return false;
   }
 