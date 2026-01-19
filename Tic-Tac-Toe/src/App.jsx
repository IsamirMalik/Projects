import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(gameTurns) {
  let currentActivePlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentActivePlayer = "O";
  }
  return currentActivePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  // const [hasWinner , setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X");
  const currentActivePlayer = getActivePlayer(gameTurns);

  let gameBoard = [...initialBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { cell, player } = turn;
    const { rowIndex, colIndex } = cell;
    gameBoard[rowIndex][colIndex] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstCellSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondCellSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdCellSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstCellSymbol &&
      firstCellSymbol === secondCellSymbol &&
      firstCellSymbol === thirdCellSymbol
    ) {
      winner = playerNames[firstCellSymbol];
    }
  }

  let hasDraw = !winner && gameTurns.length === 9;

  function cellSelectionHandler(rowIndex, colIndex) {
    // setActivePlayer(activePlayer === "X" ? "O" : "X");

    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);
      console.log(currentPlayer);
      const updatedTurns = [
        { player: currentPlayer, cell: { rowIndex, colIndex } },
        ...prevTurns,
      ];
      // console.log(updatedTurns);
      return updatedTurns;
    });
  }

  function restartHandler() {
    setGameTurns([]);
    // gameBoard = initialBoard;
  }

  function playerNameChangeHandler(symbol, newName) {
    setPlayerNames((prevPlayerNames) => {
      return {
        ...prevPlayerNames,
        [symbol]: newName,
      };
    });
  }

  return (
    <main className="container">
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={currentActivePlayer === "X"}
            onNameChange={playerNameChangeHandler}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={currentActivePlayer === "O"}
            onNameChange={playerNameChangeHandler}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={restartHandler} />
        )}
        <GameBoard onCellSelection={cellSelectionHandler} board={gameBoard} />
      </div>
      <div id="log-container">
      <Log turns={gameTurns} names={playerNames} />
      </div>
    </main>
  );
}

export default App;
