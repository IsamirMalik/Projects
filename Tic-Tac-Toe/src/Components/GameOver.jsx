export default function GameOver({ winner ,  onRestart }) {
  return (
    <div id="game-over">
      {!winner &&<>
      <h2>Game Over !</h2>
      <p>It's a draw</p>
      </>        
      }
      {winner && <>
      <h2>Congratulations ! {winner}</h2>
      <p>You're the winner</p>
      </>}
      <button onClick={onRestart}>Play again</button>
    </div>
  )
}