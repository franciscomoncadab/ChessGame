import { useRef, useState } from "react";
import { PieceFactory } from "../../pieces/piece";
import BoardImage from "../BoardImage/BoardImage";
import "./Chessboard.css";

const ejeY = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ejeX = ["a", "b", "c", "d", "e", "f", "g", "h"];

const initialBoard = [];
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  initialBoard.push(
    PieceFactory.newPiece(type, "rook", `assets/rook_${type}.png`, 0, y)
  );
  initialBoard.push(
    PieceFactory.newPiece(type, "rook", `assets/rook_${type}.png`, 7, y)
  );
  initialBoard.push(
    PieceFactory.newPiece(type, "knight", `assets/knight_${type}.png`, 1, y)
  );
  initialBoard.push(
    PieceFactory.newPiece(type, "knight", `assets/knight_${type}.png`, 6, y)
  );
  initialBoard.push(
    PieceFactory.newPiece(type, "bishop", `assets/bishop_${type}.png`, 2, y)
  );
  initialBoard.push(
    PieceFactory.newPiece(type, "bishop", `assets/bishop_${type}.png`, 5, y)
  );
  initialBoard.push(
    PieceFactory.newPiece(type, "queen", `assets/queen_${type}.png`, 3, y)
  );
  initialBoard.push(
    PieceFactory.newPiece(type, "king", `assets/king_${type}.png`, 4, y)
  );
}

for (let i = 0; i < 8; i++) {
  initialBoard.push(
    PieceFactory.newPiece("b", "pawn", `assets/pawn_b.png`, i, 6)
  );
}

for (let i = 0; i < 8; i++) {
  initialBoard.push(
    PieceFactory.newPiece("w", "pawn", `assets/pawn_w.png`, i, 1)
  );
}

export default function Chessboard() {
  const chessRef = useRef(null);
  const [activePieces, setActivePieces] = useState(null);
  const [pieces, setPieces] = useState(initialBoard);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);


  function grabPieces(e) {
    const chessboard = chessRef.current;
    const elem = e.target;
    if (elem.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      elem.style.position = "absolute";
      elem.style.left = `${x}px`;
      elem.style.top = `${y}px`;

      setActivePieces(elem);
    }
  }

  function movePieces(e) {
    const chessboard = chessRef.current;
    if (activePieces && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePieces.style.position = "absolute";

      if (x < minX) {
        activePieces.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePieces.style.left = `${maxX}px`;
      } else {
        activePieces.style.left = `${x}px`;
      }

      if (y < minY) {
        activePieces.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePieces.style.top = `${maxY}px`;
      } else {
        activePieces.style.top = `${y}px`;
      }
    }
  }

  function dropPieces(e) {
    const chessboard = chessRef.current;
    if (activePieces && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });

      setActivePieces(null);
    }
  }

  let board = [];

  for (let j = ejeY.length - 1; j >= 0; j--) {
    for (let i = 0; i < ejeX.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(
        <BoardImage key={`${j}, ${i}`} image={image} number={number} />
      );
    }
  }

  return (
    <div
      onMouseMove={(e) => movePieces(e)}
      onMouseDown={(e) => grabPieces(e)}
      onMouseUp={(e) => dropPieces(e)}
      id="chessboard"
      ref={chessRef}
    >
      {board}
    </div>
  );
}
