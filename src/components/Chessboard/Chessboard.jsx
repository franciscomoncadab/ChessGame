import React from 'react'
import Tile from '../Tile/Tile'
import './Chessboard.css'

const ejeY = ['1', '2', '3', '4', '5', '6', '7', '8'];
const ejeX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


export default function Chessboard() {
  let board = [];

  for (let j = ejeY.length - 1; j >= 0; j--) {
    for (let i = 0; i <ejeX.length; i++) {
      const number = j + i + 2;
      board.push(<Tile data={number} />);
    }
  };

  return (
    <div id="chessboard">
      {board}
    </div>
  )
}
