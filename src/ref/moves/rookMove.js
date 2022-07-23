import { isOccupied, isOccupiedOrCanAttackEnemy } from "./validMoves";

export const rookMove = (px, py, x, y, teamType, initialBoard) => {
     if (px === x) {
       for (let i = 1; i < 8; i++) {
         let upOrDown = y < py ? -1 : 1;
         let passY = py + i * upOrDown;
 
         if (px === x && passY === y) {
           if (
             isOccupiedOrCanAttackEnemy(x, passY, initialBoard, teamType)
           ) {
             return true;
           }
         } else {
           if (isOccupied(x, passY, initialBoard)) {
             break;
           }
         }
       }
     }
 
     if (py === y) {
       for (let i = 1; i < 8; i++) {
         let rightOrLeft = x < px ? -1 : 1;
         let passX = px + i * rightOrLeft;
 
         if (passX === x && py === y) {
           if (
             isOccupiedOrCanAttackEnemy(passX, y, initialBoard, teamType)
           ) {
             return true;
           }
         } else {
           if (isOccupied(passX, y, initialBoard)) {
             break;
           }
         }
       }
     }
     return false;
   }; 