
export default class Piece {
     teamType;
     pieceType;
     image;
     x;
     y;

     constructor(teamType, pieceType, image, x, y) {
          this.teamType = teamType;
          this.pieceType = pieceType;
          this.image = image;
          this.x = x;
          this.y = y;
     }

}

export class PieceFactory {
     static newPiece(teamType, pieceType, image, x, y) {
          return new Piece(teamType, pieceType, image, x, y)
     }
}
