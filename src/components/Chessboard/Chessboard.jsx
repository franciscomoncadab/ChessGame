import { useRef, useState } from "react";
import { PieceFactory } from "../../pieces/piece";
import { ejeX, ejeY, GRID_SIZE } from "../../utils/constants";
import BoardImage from "../BoardImage/BoardImage";
import Referee from "../../ref/ref";
import "./Chessboard.css";

export const initialBoard = [];
for (let p = 0; p < 2; p++) {
  const teamType = p === 0 ? "opponent" : "our";
  const type = teamType === "opponent" ? "b" : "w";
  const y = teamType === "opponent" ? 7 : 0;

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
    PieceFactory.newPiece(type, "king", `assets/king_${type}.png`, 4, 4)
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
  const referee = new Referee();
  const chessRef = useRef(null);
  const [activePieces, setActivePieces] = useState(null);
  const [pieces, setPieces] = useState(initialBoard);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);

  function grabPieces(e) {
    const chessboard = chessRef.current;
    const elem = e.target;
    if (elem.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE));
      setGridY(
        Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
        )
      );
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPieces = pieces.find((p) => p.x === gridX && p.y === gridY);

      if (currentPieces) {
        const validPieces = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPieces.pieceType,
          currentPieces.teamType,
          pieces
        );

        const isEnPassant = referee.isEnPassant(
          gridX,
          gridY,
          x,
          y,
          currentPieces.pieceType,
          currentPieces.teamType,
          pieces
        );

        if (isEnPassant) {
          const pawnDirection = currentPieces.teamType === "w" ? 1 : -1;
          const updatePieces = pieces.reduce((result, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.enPassant = false;
              piece.x = x;
              piece.y = y;
              result.push(piece);
            } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
              if (currentPieces.pieceType === "pawn") {
                piece.enPassant = false;
              }
              result.push(piece);
            }
            return result;
          }, []);

          setPieces(updatePieces);
        } else if (validPieces) {
          const updatePieces = pieces.reduce((result, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              if (
                Math.abs(gridY - y) === 2 &&
                currentPieces.pieceType === "pawn"
              ) {
                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              piece.x = x;
              piece.y = y;
              result.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              if (currentPieces.pieceType === "pawn") {
                piece.enPassant = false;
              }
              result.push(piece);
            }
            return result;
          }, []);

          setPieces(updatePieces);
        } else {
          activePieces.style.position = "relative";
          activePieces.style.removeProperty("top");
          activePieces.style.removeProperty("left");
        }

        setActivePieces(null);
      }
    }
  }

  let board = [];

  for (let j = ejeY.length - 1; j >= 0; j--) {
    for (let i = 0; i < ejeX.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) => p.x === i && p.y === j);
      let image = piece ? piece.image : undefined;
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