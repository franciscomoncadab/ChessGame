import React, { Component } from 'react'
import Tile from '../Tile/Tile';
import '../Tile/Tile.css';

function createColor (num) {
     return num % 2 === 0
}

export default class Board extends Component {

     renderSquare(i, squareShade){
          return <Tile 
               key={i}
               keyValue={i}
               shade={squareShade}
               onClick={() => this.props.onClick(i)}
          />
     }

  render() {
     let board = [];
     for (let i = 0; i < 8; i++) {
          const tile = []
          for (let j = 0; j < 8; j++) {
               const squareShade = (createColor(i) && createColor(j)) || (!createColor(i) && !createColor(j)) ? 'blue-tile' : 'white-tile';
               tile.push(this.renderSquare((i * 8) + j, squareShade));            
    }
    board.push(<div className='tile' key={i}>{tile}</div>);
  };


    return (
      <div>
          {board}
      </div>
    )
  }
};
