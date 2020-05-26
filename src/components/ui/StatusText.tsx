import React, { useContext, useRef, useEffect, useState } from "react";
import { AppContext } from "components/context/AppProvider";
import './statusText.css';
import { GameState } from "reducers/gameStateReducer";
import { SPEED_MULTIPLIER } from "constants/gameSettings";

const StatusText = () => {
  const { state } = useContext(AppContext);
  const text = state.statusText;
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const start = performance.now();
    if (state.gameState === GameState.pickingBoxes) {
      const update = () => {
        setTime(time => time + (performance.now() - start));
      };
      timeout = setInterval(update, 100);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [state.gameState, time]);

  if (state.gameState === GameState.pickingBoxes) {
    const maxTime = 45000; // maximum amount of time
    const progressBarWidth = Math.min(time / maxTime, 1);
    const progressColor = time > 27000 ? "#f63a0f" : "#86e01e";

    return (
      <div className="status">
        <div className="progress">
          <div 
            className="progress-bar"
            style={{
              width: `${progressBarWidth*100}%`,
              backgroundColor: progressColor
            }}
          ></div>
          <div className="text">
            {formatTime(time)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="status">{text}</div>
  );
}

export default StatusText;

const formatTime = (ms: number ) => {
  let seconds = (ms / 1000);
  var hours = Math.floor( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600;
  var minutes = Math.floor( seconds / 60 );
  seconds = seconds % 60;
  if (hours > 0) {
    return `${padLeft(hours)}:${padLeft(minutes)}:${seconds.toFixed(1).padStart(4, '0')}`;
  } 
  return `${padLeft(minutes)}:${seconds.toFixed(1).padStart(4, '0')}`;
}

const padLeft = (input: number) => {
  return `${input}`.padStart(2, '0');
}

