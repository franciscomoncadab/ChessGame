export default class Pieces {
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
     static new(type, img, color) {
          if (color === white) {
               img = `${type}_w.png`
          } else if (color === black) {
               img = `${type}_b.png`
          }
          
     }
};
