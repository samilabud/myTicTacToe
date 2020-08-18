import React from 'react';

//Resalta los cuadros ganadores
export function highLightSquares(winSquares){
    winSquares.map(x=>{
      document.getElementById('squareButton'+x).classList.add('win')
      return '';
    })
    
}

//Quita el resaltado al volver a los pasos previos del historico
export function unHighLightSquares(){
    let squares = [0,1,2,3,4,5,6,7,8];
    squares.map(x=>{
      document.getElementById('squareButton'+x).className='square'
      return '';
    })
    
  }
  
//Boton para reiniciar el juego una vez concluido
export function RestartButton(props){
    return (
        <a 
            href="/#"
            onClick={props.onClick}
            >reiniciar
        </a>
    );
}

//Retorna el la fila y la columna seleccionada para mostrarlo en el historico
export function getRowMove(x,y){
    if(x===undefined)
        return '';

        let rowSelected = 'Columna ' + (y+1);

        let columnas = {'Fila 1':'012','Fila 2':'345','Fila 3':'678'};
        let colSelected;         
        for (let c in columnas){
            if(columnas[c].includes(x)){
                colSelected = c;
            }
        }
    return rowSelected + ', ' + colSelected;
}

//Determina el ganador, retorna el arreglo ganador y llama la funcion highLightSqares
export function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        let winSquares = [a,b,c];
        highLightSquares(winSquares);
        return squares[a];
      }
    }
    return null;
  }

export default highLightSquares;