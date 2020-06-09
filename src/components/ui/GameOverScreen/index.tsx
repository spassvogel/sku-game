import { useContext, useState, useEffect, useMemo, memo } from "react";
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
      setTimeout(setShow, 10000, true);
    }
  }, [state.gameState]);

  let totalScore = 0;
  const maxScore = 16;

  // Create array of pairs (arrays)
  const pairs = useMemo(() => {
    return state.wms.filter(p => p.pair).reduce<[string, string][]>((acc, value) => {
      const pair = acc.find(p => p.indexOf(value.pair!) > -1);
      if (pair) {
        pair[1] = value.productCode;
      } else {
        acc.push([value.productCode, ""])
      }
      return acc;
    }, []);
  }, [state.wms]);
  
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
        if (zone === category.toString()){
          correct++;
        }
      }
    })
    const points = correct * pointsPerProduct;
    totalScore += points;
    return (
      <li>{`${display} products placed correct = ${points}/${total * pointsPerProduct} points`}</li>
    )
  }
  
  const getPairRow = (pair: [string, string]) => {
    const location1 = state.warehouse.boxes[pair[0]].location;
    const location2 = state.warehouse.boxes[pair[1]].location;

    const placedNext = (Math.abs(location1[0] - location2[0]) === 1) && location1[1] === location2[1];
    let points = 0;
    if (placedNext) {
      points = 3;
      totalScore += points;
      return <li>{`Product pair (${pair}) placed near to each other = ${points}/3 points`}</li>
    }
    return <li>{`Product pair (${pair}) not placed near to each other = ${points}/3 points`}</li>
  }

  const getBinRow = () => {
    let points = 0;
    const nonMovers = state.wms.filter(p => p.category === Categories.D);
    // All non movers should be in the bin zone
    nonMovers.forEach(value => {
      const {zone} = state.warehouse.boxes[value.productCode];
      if (zone !== Categories.D.toString()){
        points -= 5;
      }
    });
    const movers = state.wms.filter(p => p.category !== Categories.D);
    // All regular products should not be in the bin!
    movers.forEach(value => {
      const {zone} = state.warehouse.boxes[value.productCode];
      if (zone === Categories.D.toString()){
        points -= 5;
      }
    });
    totalScore += points;
    return <li>{`(only) non moving products placed in bin = ${points}/0 points`}</li>
  }

  return (
    <div className="gameover-screen">
      <div className="text">
        <h1>Complete!</h1>
        <ul>
          {pairs.map(p => getPairRow(p))}
          {getProductRow("Fast moving", Categories.A)}
          {getProductRow("Medium moving", Categories.B)}
          {getProductRow("Slow moving", Categories.C)}
          {getBinRow()}
        </ul>

        Your time: {formatTime(state.time)}
        <div>
          {`Total score: ${totalScore}/${maxScore}`}
        </div>
        <div className="button">
          <button onClick={handleReset}>
            Try again?
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(GameOverScreen);
