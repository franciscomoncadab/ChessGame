import React from 'react'
import Tile from '../Tile/Tile'
import initializeChess from '../../helpers/init'
import './Chessboard.css'
import { useEffect, useState } from 'react';




export default function Chessboard() {
  const [initial, setInitial] = useState([])
  useEffect(() => {
    setInitial(initializeChess())}
    , [])

    console.log(initial)
    
  return (
    <div id="chessboard">
      {initial.map((piece, index) => 
        <Tile 
          key={index}
          keyvalue={index}
          img={piece ? piece.img : null}
        />)} 
    </div>
  )
}
