import { useState } from "react";

function Board({xIsNext, squares,onPlay}) {


  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext === true) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }




  const winner = calculateWinner(squares);
  let status = "";

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Squere value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Squere value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Squere value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Squere value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Squere value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Squere value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Squere value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Squere value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Squere value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Squere({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]

 
  function jumpTo (nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1)
  }

  const moves = history.map((squares, move) => {
    let description ="";
    if(move >0) {
      description = "Go to move #" + move;
    }else {
      description = "Go to game start";
    }

    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}> {description} </button>
      </li>
      )

  })

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}



function calculateWinner(squares) {
  const lines = [
    //garis horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //garis vertikal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //garis diagonal
    [0, 4, 6],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const a = lines[i][0];
    const b = lines[i][1];
    const c = lines[i][2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}
