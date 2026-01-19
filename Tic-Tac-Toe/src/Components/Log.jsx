export default function Log({ turns , names }) {
  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li key={index}>
          {names[turn.player]} Selected {turn.cell.rowIndex} , {turn.cell.colIndex}
        </li>
      ))}
    </ol>
  );
}
