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

export default function Tile(props) {
  return (
    <button className={`tile ${props.shade}`}
     onClick={props.onClick}
     //style={props.style}
     keyValue={props.keyValue}
    >
    {}

    </button>
  );
}
