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

let activePieces = null;

function grabPieces(e) {
     const elem = e.target
     if(elem.classList.contains('chess-piece')){
          const x = e.clientX - 50;
          const y = e.clientY - 50;
          elem.style.position = 'absolute';
          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;

          activePieces = elem;
     }
}

function movePieces(e) {
     if(activePieces){
          const x = e.clientX - 50;
          const y = e.clientY - 50;
          activePieces.style.position = 'absolute';
          activePieces.style.left = `${x}px`;
          activePieces.style.top = `${y}px`;
     }
}

function dropPieces() {
     if (activePieces){
          activePieces = null;
     }
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

               board.push( <BoardImage key={`${j}, ${i}`} image={image} number={number} />)
          }
          
     }

  return (
    <div 
          onMouseMove={e => movePieces(e)} 
          onMouseDown={e => grabPieces(e)} 
          onMouseUp={e => dropPieces(e)}
          id="chessboard">
     {board}    
    </div>
  )
}
