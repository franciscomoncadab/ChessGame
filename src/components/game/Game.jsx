import React, { Component } from 'react'
import Tile from '../Tile/Tile'
import initializeChess from '../../helpers/init'

export default class Game extends Component {
     constructor(){
          super();
          this.state={
               squares: initializeChess()
          }
     }

     handleClick(i) {
          const squares = [...this.state.squares]
     }

  render() {
    return (
      <div>
          <div>
               <Tile 
                    squares={this.state.squares}
                    onClick={(i) => this.handleClick(i)}
               />
          </div>
      </div>
    )
  }
}
