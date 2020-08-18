import React from 'react';
import Board from './myboard.js';
import {highLightSquares,RestartButton, unHighLightSquares, getRowMove, calculateWinner} from './utilities.js' 

class Game extends React.Component {
    constructor(props){
      super(props);
      this.state={
          history:[{
              squares: Array(9).fill(null),
              xPosition:"",
              yPosition:"",
          }],
          xIsNext:true,
          totalWinsX:0,
          totalWinsO:0,
          stepNumber:0,
          orderList:false,//Ordenar lista
          
      };
    }

    hazClick(i,j){
      //console.log(i+' '+j);
      const history = this.state.history.slice(0,this.state.stepNumber + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      
      if(calculateWinner(squares)||squares[i])
       return;
      squares[i] = this.state.xIsNext?'X':'O';
      this.setState({
          history:history.concat([
                          { squares:squares,
                            xPosition:i,
                            yPosition:j,
                          }
                      ]),
          stepNumber:history.length,
          xIsNext:!this.state.xIsNext,
      });
  }
  jumpTo(paso){
      unHighLightSquares();
      this.setState({
          stepNumber:paso,
          xIsNext:(paso%2)===0,
      })
  }
  setSquaresToNull(totalX,totalO){
      unHighLightSquares();
      this.setState(
              { history:[{
                  squares: Array(9).fill(null)
                }],
               totalWinsX:totalX,
               totalWinsO:totalO,
               stepNumber:0
              }
          );
  }
  reorderList(){
   this.setState(
      { 
        history: this.state.history.reverse(),
        orderList:!this.state.orderList,
      }
    )
  }
  renderRestart(totalX,totalO){
      return <RestartButton onClick={()=>this.setSquaresToNull(totalX,totalO)}/>
  }
  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      let orderList = this.state.orderList;

      let index = 1;
      if(orderList)
          index = history.length;

      const moves = history.map((paso,mov)=>{
          let pos = getRowMove(paso.xPosition, paso.yPosition);
          //console.log(mov);
          const desc = index!==1 ? 'Ir al paso #' + index + ' - ' + pos : 'Ir al inicio del juego. #' + index;
          if(!orderList)
            index++;
          else 
            index --;
          return (
              <ol key={mov}>
                  <button onClick={()=>this.jumpTo(mov)} style={this.state.stepNumber===mov?{fontWeight:'bold'}:{fontWeight:'normal'}}>{desc}</button>
              </ol>
          )
      })
      const orderButton = ( <button onClick={()=>this.reorderList()}>Reordenar</button> );

      let status;
      let restart;
      let totalWinsX = this.state.totalWinsX;
      let totalWinsO = this.state.totalWinsO;
      if(winner){
          status = 'El ganador es ' + winner ;
          totalWinsX += (winner === 'X')?1:0;
          totalWinsO += (winner === 'O')?1:0;
          restart = this.renderRestart(totalWinsX,totalWinsO);
      }else{
         status = 'Siguiente : ' + (this.state.xIsNext?'X':'O');
      }
      //There is not a Winner
      if(!current.squares.includes(null) && !winner){
        status = 'Empate!';
        restart = this.renderRestart(totalWinsX,totalWinsO);
      }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
              squares = {current.squares}
              onClick = {(i,j)=>this.hazClick(i,j)}
          />
        </div>
        <div className="game-info">
          <div>{ status } {restart}</div>
          <ol>{ moves }</ol>
        </div>
        <div>
          {orderButton}
        </div>
        <div>
          <table border='1' className='pizarra'>
              <caption><h5>Pizarra de jugadores</h5></caption>
              <tbody>
              <tr>
                      <th>X</th>
                      <th>O</th>
              </tr>
              <tr>
                  <td>{totalWinsX}</td>
                  <td>{totalWinsO}</td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
      
    );
  }
}

export default Game;