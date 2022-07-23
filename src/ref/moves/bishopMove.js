import { isOccupied, isOccupiedOrCanAttackEnemy } from "./validMoves";

export const bishopMove = (px, py, x, y, teamType, initialBoard) => {
     for (let i = 1; i < 8; i++) {
       //up right movement
       if (x > px && y > py) {
         let passX = px + i;
         let passY = py + i;
         if (passX === x && passY === y) {
           if (
             isOccupiedOrCanAttackEnemy(
               passX,
               passY,
               initialBoard,
               teamType
             )
           ) {
             return true;
           }
         } else {
           if (isOccupied(passX, passY, initialBoard)) {
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
             isOccupiedOrCanAttackEnemy(
               passX,
               passY,
               initialBoard,
               teamType
             )
           ) {
             return true;
           }
         } else {
           if (isOccupied(passX, passY, initialBoard)) {
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
             isOccupiedOrCanAttackEnemy(
               passX,
               passY,
               initialBoard,
               teamType
             )
           ) {
             return true;
           }
         } else {
           if (isOccupied(passX, passY, initialBoard)) {
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
             isOccupiedOrCanAttackEnemy(
               passX,
               passY,
               initialBoard,
               teamType
             )
           ) {
             return true;
           }
         } else {
           if (isOccupied(passX, passY, initialBoard)) {
             break;
           }
         }
       }
     }
 
     return false;
   }
 