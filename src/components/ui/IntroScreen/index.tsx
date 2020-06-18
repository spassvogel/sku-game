import { memo, useContext } from "react";
import React from "react";
import "./introScreen.css"
import { AppContext } from "components/context/AppProvider";
import { GameState } from "reducers/gameStateReducer";


const IntroScreen = () => {
  const {state, dispatch} = useContext(AppContext);

  const onClick = () => {
    dispatch({ type: "startGame" });
  }

  if (state.gameState !== GameState.intro) {
    return null;
  }
  return (
    <div className="intro-screen">
        <h1>SKU is the word!</h1>
      <div className="modal">
        <div className="text">
          The warehouse needs to be filled! Consult the WMS to know what goes where. 
        </div>
        <div className="trilogy">
          <div>
            <img src={`${process.env.PUBLIC_URL}/images/intro/intro-1.png`} alt="docking area"></img>
            <p>Take the boxes from the outside area. Check the contents on the WMS.</p>
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/images/intro/intro-2.png`} alt="docking area"></img>
            <p>Place the boxes in the racks in the warehouse. Note the distance of the racks to the outbound area.</p>
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/images/intro/intro-3.png`} alt="docking area"></img>
            <p>Some products will not be sold. Place them outside in the discard area.</p>
          </div>
        </div>
      </div>
        <button onClick={onClick} className="button">
          Start
        </button>
    </div>
  )
}

export default memo(IntroScreen);
