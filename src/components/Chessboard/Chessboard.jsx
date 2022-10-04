import { useRef, useState } from "react";
import { PieceFactory } from "../../pieces/piece";
import { ejeX, ejeY, GRID_SIZE } from "../../utils/constants";
import BoardImage from "../BoardImage/BoardImage";
import Referee from "../../ref/ref";
import "./Chessboard.css";
import { useEffect } from "react";

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

export default function Chessboard(params) {
  const socket = params.socket;
  const referee = new Referee();
  const chessRef = useRef(null);
  const modalRef = useRef(null);
  const [activePieces, setActivePieces] = useState(null);
  const [promotionPawn, setPromotionPawn] = useState();
  const [pieces, setPieces] = useState(initialBoard);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [turn, setTurn] = useState("w");
  const [teamType, setTeamType] = useState(null);

  useEffect(() => {
    socket.emit("getCurrentPlayers");
  }, []);

  useEffect(() => {
    socket.on("currentTurn", (t) => {
      setTurn(t);
    });

    socket.on("currentTeamType", (p) => {
      setTeamType(p);
    });

    socket.on("currentPlayers", (n) => {
      console.log(n);
    });
  }, [socket]);

  function grabPieces(e) {
    const chessboard = chessRef.current;
    const elem = e.target;

    console.log(teamType, turn);
    if (teamType !== turn) {
      return;
    }

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
          console.log(turn);
          if (currentPieces.teamType !== turn) {
            alert("This is not your turn");
            return;
          }
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

              let canBePromotion = piece.teamType === "w" ? 7 : 0;

              if (y === canBePromotion && piece.pieceType === "pawn") {
                modalRef.current.classList.remove("hidden");
                setPromotionPawn(piece);
              }
              result.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              if (currentPieces.pieceType === "pawn") {
                piece.enPassant = false;
              }
              result.push(piece);
            }
            return result;
          }, []);

          if (currentPieces.teamType === turn) {
            socket.emit("updateDropPieces", updatePieces);
            socket.emit("getTurn");
          } else {
            alert("This is not your turn");
          }
        } else {
          activePieces.style.position = "relative";
          activePieces.style.removeProperty("top");
          activePieces.style.removeProperty("left");
        }

        setActivePieces(null);
      }
    }
  }

  useEffect(() => {
    socket.on("dropPiecesBackend", (data) => {
      setPieces(data);
    });
  }, [socket]);

  function promotePawn(pieceType) {
    const updatePieces = pieces.reduce((result, piece) => {
      if (piece.x === promotionPawn.x && piece.y === promotionPawn.y) {
        piece.pieceType = pieceType;
        const teamType = piece.teamType === "w" ? "w" : "b";
        piece.image = `assets/${pieceType}_${teamType}.png`;
      }
      result.push(piece);
      return result;
    }, []);
    setPieces(updatePieces);
    modalRef.current.classList.add("hidden");
  }

  function joinGame() {
    socket.emit("joinGame");
    socket.emit("getTeamType");
  }

  function resetGame() {
    socket.emit("resetGame");
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
    <>
      <div id="modal-promotion" className="hidden" ref={modalRef}>
        <div className="modal">
          <img
            onClick={() => promotePawn("rook")}
            src="/assets/rook_w.png"
            alt="rook"
          />
          <img
            onClick={() => promotePawn("knight")}
            src="/assets/knight_w.png"
            alt="knight"
          />
          <img
            onClick={() => promotePawn("bishop")}
            src="/assets/bishop_w.png"
            alt="bishop"
          />
          <img
            onClick={() => promotePawn("queen")}
            src="/assets/queen_w.png"
            alt="queen"
          />
        </div>
      </div>
      <div className="flex flex-row gap-8 ">
        <div
          onMouseMove={(e) => movePieces(e)}
          onMouseDown={(e) => grabPieces(e)}
          onMouseUp={(e) => dropPieces(e)}
          id="chessboard"
          ref={chessRef}
        >
          {board}
        </div>
        <div className="flex flex-col gap-20 items-center">
          <button
            type="button"
            className="w-36 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-3.5 text-center mr-2 mb-2"
            onClick={() => joinGame()}
          >
            Join Game!
          </button>
          <button
            type="button"
            className="w-36 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 mr-2 mb-2"
            onClick={() => resetGame()}
          >
            Reset Game
          </button>
          <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Current Turn:</h5>
            <p class="text-center font-normal text-gray-700 dark:text-gray-400">{turn === 'w' ? "White" : " Black "}</p>
          </a>
        </div>
      </div>
    </>
  );
}
