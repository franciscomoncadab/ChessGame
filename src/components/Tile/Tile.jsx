import React from 'react'
import './Tile.css'

const Tile = (props) => {
     let num = props.data
     if(num % 2 === 0) {
          return <div className="tile blue-tile"><image src={`./assets/${props.image}`}/></div>
     } else {
          return <div className="tile white-tile"><image src={`./assets/${props.image}`}/></div>
     }
}

export default Tile