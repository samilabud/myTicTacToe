import React from 'react';
import Square  from './mysquare.js';

export class Board extends React.Component {
    
    renderSquare(i,j) {
      //console.log(i+' '+j);
      return <Square key={i}
                value={this.props.squares[i]} 
                onClick={()=>this.props.onClick(i,j)}
                name = {'squareButton' + i}
                />;
    }

    render() {
      let squaresToRender = [[0,1,2],[3,4,5],[6,7,8]];
      return (
        <div>
          {squaresToRender.map((pRow,pIndex)=>{
                return <div className="board-row" key={pIndex+1}> 
                {pRow.map((cRow,cIndex)=>{
                  return this.renderSquare(cRow,cIndex)
                })}
                </div>
            })}
        </div>
      );
    }
  }

export default Board;