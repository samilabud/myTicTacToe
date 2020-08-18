import React from 'react';

function Square(props){
    return (
      <button 
          id={props.name}
          className="square" 
          onClick={props.onClick}
      >
        {props.value}
      </button>
    );
};

export default Square;