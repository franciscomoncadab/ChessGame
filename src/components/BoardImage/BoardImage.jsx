import React from 'react'
import './BoardImage.css'

export default function BoardImage(props) {
     if(props.number % 2 === 0) {
          return (
          <div className="board piece-black">
               {props.image && <div style={{backgroundImage: `url(${props.image})`}} className="chess-piece"></div>}
          </div>
     )} else {
          return (
          <div className="board piece-white">
               {props.image && <div style={{backgroundImage: `url(${props.image})`}} className="chess-piece"></div>}
          </div>
     )}
}
