import {PieceFactory} from '../../pieces/piece'
import BoardImage from '../BoardImage/BoardImage'
import './Chessboard.css';

const ejeY = ['1', '2', '3', '4', '5', '6', '7', '8'];
const ejeX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


const pieces = []
for (let p = 0; p < 2; p++) {
     const type= p === 0 ? 'b':'w';
     const y = p === 0 ? 7:0;
     
     pieces.push(PieceFactory.newPiece(type, 'rook', `assets/rook_${type}.png`, 0, y));
     pieces.push(PieceFactory.newPiece(type, 'rook', `assets/rook_${type}.png`, 7, y));
     pieces.push(PieceFactory.newPiece(type, 'knight', `assets/knight_${type}.png`, 1, y));
     pieces.push(PieceFactory.newPiece(type, 'knight', `assets/knight_${type}.png`, 6, y));
     pieces.push(PieceFactory.newPiece(type, 'bishop', `assets/bishop_${type}.png`, 2, y));
     pieces.push(PieceFactory.newPiece(type, 'bishop', `assets/bishop_${type}.png`, 5, y));
     pieces.push(PieceFactory.newPiece(type, 'queen', `assets/queen_${type}.png`, 3, y));
     pieces.push(PieceFactory.newPiece(type, 'king', `assets/king_${type}.png`, 4, y));
}

for (let i = 0; i < 8; i++) {
     pieces.push(PieceFactory.newPiece('b', 'pawn', `assets/pawn_b.png`, i, 6));          
}

for (let i = 0; i < 8; i++) {
     pieces.push(PieceFactory.newPiece('w', 'pawn', `assets/pawn_w.png`, i, 1));     
}

export default function Chessboard() {
     let board = [];

     for (let j = ejeY.length - 1; j >= 0; j--) {
          for (let i = 0; i < ejeX.length; i++) {
               const number = j + i + 2;
               let image = undefined;

               pieces.forEach(p => {
                    if(p.x === i && p.y === j){
                         image = p.image
                    }
               })

               board.push( <BoardImage image={image} number={number} />)
          }
          
     }

  return (
    <div id="chessboard">
     {board}    
    </div>
  )
}
