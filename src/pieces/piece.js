
export default class Piece {
     teamType;
     pieceType;
     image;
     x;
     y;
     enPassant;

     constructor(teamType, pieceType, image, x, y, enPassant) {
          this.teamType = teamType;
          this.pieceType = pieceType;
          this.image = image;
          this.x = x;
          this.y = y;
          this.enPassant = enPassant;
     }

}

export class PieceFactory {
     static newPiece(teamType, pieceType, image, x, y, enPassant) {
          return new Piece(teamType, pieceType, image, x, y, enPassant);
     }
}
