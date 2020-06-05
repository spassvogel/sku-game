import React, { useContext } from "react";
import { AppContext } from "components/context/AppProvider";
import './startButton.css';
import { GameState } from "reducers/gameStateReducer";

const StartButton = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleClick = () => {
    switch (state.gameState) {
      case GameState.placingBoxes:
        const allBoxedPlaced = !Object.values(state.warehouse.boxes).some(b => !(b.zone));
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
      return <button onClick={handleClick} className="start-button"><h1>Complete</h1></button>;
    default:
      return null;
  }
}

export default StartButton;