/*import React from 'react'
import './Tile.css'

const Tile = (props) => {
     let num = props.data
     if(num % 2 === 0) {
          return <div className="tile blue-tile"><image src={`./assets/${props.image}`}/></div>
     } else {
          return <div className="tile white-tile"><image src={`./assets/${props.image}`}/></div>
     }
}

export default Tile */

import React from 'react'
import './Tile.css'

const chessBlue = [0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63];
export default function Tile(props) {
  return (
    <button className={`tile ${chessBlue.includes(props.keyvalue) ? 'blue-tile' : 'white-tile'}`}
     onClick={props.onClick}
     //style={props.style}
     img={props.img}
     color={props.color}
     keyvalue={props.keyvalue}
    >
    {props.img ? <img src={`/assets/${props.img}`} alt=''/> : null}
     
    </button>
  );
}
