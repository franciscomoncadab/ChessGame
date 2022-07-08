
export default class Piece {
     type;
     pieceType;
     image;
     x;
     y;

     constructor(type, pieceType, image, x, y) {
          this.type = type;
          this.pieceType = pieceType;
          this.image = image;
          this.x = x;
          this.y = y;
     }

}

export class PieceFactory {
     static newPiece(type, pieceType, image, x, y) {
          return new Piece(type, pieceType, image, x, y)
     }
}
