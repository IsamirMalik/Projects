import { useState } from "react";

export default function Player ({initialName , symbol , isActive , onNameChange}) {
  const [name , setName] = useState(initialName);
  const [isEditing , setIsEditing] = useState(false);

  // console.log('render');
  function clickHandler(){
    setIsEditing((editing) => !editing);
    if(isEditing){
      onNameChange(symbol,name);
    }
  }

  function changeHandler(event){
    setName(event.target.value);

  }

  let playerName = <span className="player-name">{name}</span>;
  let btnCaption = 'Edit';

  if(isEditing){
    playerName = <input type="text" required value={name} onChange={changeHandler} />;
    btnCaption = 'Save';
  }
 
  return (
    <li className={isActive ? 'active' : null}>
    <span className="player"> 
      {playerName}       
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={clickHandler}>{btnCaption}</button>
    </li>
  )
}