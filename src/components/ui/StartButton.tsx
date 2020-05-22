import React, { useContext } from "react";
import { AppContext } from "components/context/AppProvider";
import './startButton.css';

const StartButton = () => {
  const { state, dispatch } = useContext(AppContext);
  const text = state.gameState;

  const handleClick = () => {
    const allBoxedPlaced = !Object.values(state.warehouse.boxes).some(b => !b.inRack);
    if(!allBoxedPlaced) {
      dispatch({ type: 'setStatusText', text: "First place all goods in the warehouse!"});
      return;
    }
    dispatch({ type: 'startPicking'});
  };

  return (
    <button onClick={handleClick} className="start-button"><h1>Start</h1></button>
  );
}

export default StartButton;