import React from 'react'
import './BoardImage.css'

export default function BoardImage(props) {
     if(props.number % 2 === 0) {
          return (
          <div className="board piece-black">
               {props.image ? <img src={props.image} alt="black-piece" /> : null }
          </div>
     )} else {
          return (
          <div className="board piece-white">
               {props.image ? <img src={props.image} alt="black-piece" /> : null }
          </div>
     )}
}
