import React from 'react';
import './App.css';
import Scene from 'components/Scene';
import * as PIXI  from 'pixi.js';
import { Stage } from '@inlet/react-pixi';
window.PIXI = PIXI;

function App() {
  
  const width = 672;
  const height = 400;
  const sceneHeight = 320;

  return (
    <div className="App">
      <Stage width={width} height={height}>
        <Scene tilemap="scenes/level1.json" width={width} height={height} y={height - sceneHeight}/>
      </Stage>
    </div>
  );
}

export default App;
