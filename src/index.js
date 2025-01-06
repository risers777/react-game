import React, { use, useState } from 'react';
import ReactDOM from 'react-dom';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';


import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const Square = (props) => {
const [value, setvalue] = useState(null);
return (
  <button 
  className="square"
  onClick={props.onClickEvent}
  >
    {props.value}
  </button>
)
}

const Board = () => {
  const initialSquares = Array(9).fill(null); 
const [squares, setSquares] = useState(initialSquares);
const [xIsNext, setXIsNext] = useState(true);

const handleClickEvent = (i) =>{
  // 1. make a copy square state array
  const newSquares =[...squares];
// returning early from a function - in this case is done so that once the game is done the X and Os will not be anymore updated
// and also not to update the state or the block that has already be assigned with X or O
const winnerDeclared = calculateWinner(newSquares);
const SquareFilled = Boolean(newSquares[i]);
if(winnerDeclared || SquareFilled) {
  return;
}

  // 2. Mutate the copy, setting the i-th element to 'X'
  newSquares[i] = xIsNext ? 'X' : 'O';
  // 3. call the setSquares function with the mutatued copy 
  setSquares(newSquares);
  setXIsNext(!xIsNext);
};

const renderSquare = (i) => {
  return (
    <Square 
    value={squares[i]} 
    onClickEvent={() => handleClickEvent(i)}
    />

  );
};
const winner = calculateWinner(squares);
const status = winner ? 
`Winner: ${winner}` :
`Next player : ${xIsNext ? 'X' : 'O'}`;

return (
  <div>
  <div className="status">{status}</div>
  <div className="board-row">
  {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
  </div>
  <div className="board-row">
  {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
  </div>
  <div className="board-row">
  {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
  </div>
  </div>
);
};

const Game = () =>{
  return(
    <div className ="game"> 
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );

root.render(
  <StrictMode>
     <Game />
  </StrictMode>,
);

function calculateWinner(squares){
  const lines = [
[0,1,2], [3,4,5], [6,7,8], // rows - horizantal
[0,3,6], [1,4,7], [2,5,8], // vertical 
[0,4,8], [2,4,6], // diagonals
];

for (let line of lines){
  const [a,b,c] =line;
  if(squares[a] && squares[a] === squares[b] && squares[a] == squares[c]){
    return squares[a]; // 'X' or 'O' as the winner. 
  }
}
 return null;
}