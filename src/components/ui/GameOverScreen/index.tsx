import { useContext, useState, useEffect, useMemo, memo, Fragment } from "react";
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

    state.wms.forEach((value: WMSData) => {
      if (value.category === category) {
        total++;
        const {zone} = state.warehouse.boxes[value.productCode];
        if (zone === category.toString()){
          correct++;
        }
      }
    })
    const points = correct;
    totalScore += points;
    return (
      <>
        <div>{`${display} `}</div>
        <div>{`${points} placed correct`}</div>
        <div>{`${points}/${total}`}</div>
      </>
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
      return (
        <Fragment key={pair.toString()}>
          <div>Pair: {`${pair}`}</div>
          <div>Placed next to each other</div>
          <div>{`${points}/3`}</div>
        </Fragment>
      )
    }
    return (
      <Fragment key={pair.toString()}>
        <div>Pair: {`${pair}`}</div>
        <div>Not placed next to each other</div>
        <div>{`${points}/3`}</div>
      </Fragment>
    )
  }

  const getBinRow = () => {
    const pointPenalty = 5;
    let mistakes = 0;
    const nonMovers = state.wms.filter(p => p.category === Categories.D);
    // All non movers should be in the bin zone
    nonMovers.forEach(value => {
      const {zone} = state.warehouse.boxes[value.productCode];
      if (zone !== Categories.D.toString()){
        mistakes++;
      }
    });
    const movers = state.wms.filter(p => p.category !== Categories.D);
    // All regular products should not be in the bin!
    movers.forEach(value => {
      const {zone} = state.warehouse.boxes[value.productCode];
      if (zone === Categories.D.toString()){
        mistakes++;
      }
    });
    const points = -pointPenalty * mistakes;
    totalScore += points;
    return (
      <>
        <div>Non moving products</div>
        <div>{`${mistakes} mistakes made`}</div>
        <div>{`${points}`}</div>
      </>
    )
  }

  return (
    <div className="gameover-screen">
        <h1>Scoreboard</h1>
      <div className="modal">
        <div className="table">
          <div className="table-header">Products</div>
          <div className="table-header">Result</div>
          <div className="table-header">Score</div>
          {getProductRow("Fast moving products", Categories.A)}
          {getProductRow("Medium moving products", Categories.B)}
          {getProductRow("Slow moving products", Categories.C)}
          {pairs.map(p => getPairRow(p))}
          {getBinRow()}

          <div className="table-footer">
          </div>
          <div className="table-footer">
            Your time: {formatTime(state.time)}
          </div>
          <div className="table-footer">
            Total: 
            <b>{totalScore}</b>
          </div>
        </div>
      </div>
        <button onClick={handleReset} className="button">
          Try again?
        </button>
    </div>
  )
}

export default memo(GameOverScreen);
