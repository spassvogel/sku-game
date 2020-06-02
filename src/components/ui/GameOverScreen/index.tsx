import { useContext, useState, useEffect } from "react";
import React from "react";
import { GameState } from "reducers/gameStateReducer";
import { AppContext } from "components/context/AppProvider";
import "./gameOverScreen.css"
import { formatTime } from "../StatusText";
import { Categories, WMSData } from "reducers/wmsReducer";

const GameOverScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [show, setShow] = useState(false); 

  const handleReset = () => {
    setShow(false);
    dispatch({ type: "restart" });
  }
  
  useEffect(() => {
    if (state.gameState === GameState.pickingBoxes) {
      setTimeout(setShow, 700, true);
    }
  }, [state.gameState]);
  
  if (!show) {
    return null;
  }

  const getProductRow = (display: string, category: Categories) => {
    let correct = 0;
    let total = 0;
    const pointsPerProduct = 1;
    state.wms.forEach((value: WMSData) => {
      if (value.category === category) {
        total++;
        const {zone} = state.warehouse.boxes[value.productCode];
        console.log(category.toString());
        if (zone === category.toString()){
          correct++;
        }
        console.log(`product ${value.productCode} is placed in ${zone}`)
      }
    })
    return (
      <li>{`${display} products placed correct ${correct} (out of ${total}) = ${correct * pointsPerProduct} points`}</li>
    )
  }

  

  return (
    <div className="gameover-screen">
      <div className="text">
        <h1>Complete!</h1>
        <ul>
          
          {/* {getProductRow("Fast moving", Categories.A)}
          {getProductRow("Medium moving", Categories.B)}
          {getProductRow("Slow moving", Categories.C)} */}
        </ul>

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
