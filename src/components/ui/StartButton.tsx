import React, { useContext } from "react";
import { AppContext } from "components/context/AppProvider";
import './startButton.css';
import { GameState } from "reducers/gameStateReducer";

const StartButton = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleClick = () => {
    switch (state.gameState) {
      case GameState.placingBoxes:
        console.log(state.warehouse.boxes);
        const allBoxedPlaced = !Object.values(state.warehouse.boxes).some(b => !(b.inRack || b.inTrash));
        if(!allBoxedPlaced) {
          dispatch({ type: 'setStatusText', text: "First place all goods in the warehouse!"});
          return;
        }
        dispatch({ type: 'startPicking'});
    
        break;
      case GameState.complete:
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        break;
    }
  };

  switch (state.gameState) {
    case GameState.placingBoxes:
      return <button onClick={handleClick} className="start-button"><h1>Start</h1></button>;
    default:
      return null;
  }
}

export default StartButton;