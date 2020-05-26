import { useContext } from "react";
import React from "react";
import { GameState } from "reducers/gameStateReducer";
import { AppContext } from "components/context/AppProvider";
import "./gameOverScreen.css"
import { formatTime } from "../StatusText";

const GameOverScreen = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleReset = () => {
    dispatch({ type: "restart" });
  }
  if (state.gameState !== GameState.complete) {
    return null;
  }
  return (
    <div className="gameover-screen">
      <div className="text">
        <h1>Game over!</h1>
        Your time: {formatTime(state.time)}
        <div className="button">
          <button onClick={handleReset}>
            Try again?
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOverScreen;
