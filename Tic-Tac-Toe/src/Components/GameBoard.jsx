

export default function GameBoard({onCellSelection , board }) { 


  // const [gameBoard , setGameBoard] = useState(initialBoard);

  // function clickHandler(rowIndex,colIndex){
    
  //   setGameBoard((initialBoard) => {
  //     let updatedBoard = [...initialBoard.map(innerArray => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard ;
  //   })
  //   onCellSelection();
    // console.log(rowIndex,cellIndex);
  // }

  return (
    <ol id="game-board">
    {board.map((row,rowIndex) => (
      <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol,colIndex) => (
            <li key={colIndex}>
              <button onClick={() => onCellSelection(rowIndex,colIndex)} disabled={playerSymbol !== null} >{playerSymbol}</button>
            </li>
          ))}
        </ol>
      </li>
    ))}
    </ol>
  )
}