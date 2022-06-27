export default class Piece {
     type;
     img;
     color;

     constructor(type, img, color) {
          this.type = type;
          this.color = color;
          this.img = img;
     }

     getPlayer() {
    return this.Pieces
    
  }
}

export class PieceFactory {
     static newPiece(color, type, img) {
          if (color === 'white') {
               img = `${type}_w.png`
          } else if (color === 'black') {
               img = `${type}_b.png`
          }
          return new Piece(type, img, color)     
     }
}; 




