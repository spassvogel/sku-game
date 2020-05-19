import React, { useContext } from "react";
import { AppContext } from "components/context/AppProvider";

const StartButton = () => {
  const { state, dispatch } = useContext(AppContext);
  const text = state.gameState;

  const handleClick = () => {    
    dispatch({ type: 'startPicking'});
  };
  return (
    <button onClick={handleClick}><h1>Start {text}</h1></button>
  );
}

export default StartButton;