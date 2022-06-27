import React from 'react'
import {chessBlue} from '../../helpers/dictionary'
import './Tile.css'


export default function Tile(props) {
  return (
    <button className={`tile ${chessBlue.includes(props.keyvalue) ? 'blue-tile' : 'white-tile'}`}
     onClick={props.onClick}
     img={props.img}
     color={props.color}
     keyvalue={props.keyvalue}
    >
    {props.img ? <img src={`/assets/${props.img}`} alt=''/> : null}
     
    </button>
  );
}
