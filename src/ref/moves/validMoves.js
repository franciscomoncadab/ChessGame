export const isOccupiedOrCanAttackEnemy = (x, y, initialBoard, teamType) => {
     return (
       !isOccupied(x, y, initialBoard) ||
       canAttackEnemy(x, y, initialBoard, teamType)
     );
   };
 
export const isOccupied = (x, y, initialBoard) => {
     const piece = initialBoard.find((p) => p.x === x && p.y === y);
     if (piece) {
       return true;
     } else {
       return false;
     }
   };
 
   export const canAttackEnemy = (x, y, initialBoard, teamType) => {
     const piece = initialBoard.find(
       (p) => p.x === x && p.y === y && p.teamType !== teamType
     );
 
     if (piece) {
       return true;
     } else {
       return false;
     }
   };