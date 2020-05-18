import React from 'react';
import './App.css';
import Scene from 'components/Scene';
import * as PIXI  from 'pixi.js';
import { Stage } from '@inlet/react-pixi';
import Box from 'components/pixi/Box';
import IPad from 'components/ui/IPad';
window.PIXI = PIXI;

function App() {
  
  const width = 21 * 32;
  const height = 32 * 13;

  return (
    <div className="App">
      <Stage width={width} height={height}>
        <Scene tilemap="scenes/level1.json" width={width} height={height}/>
      </Stage>
      <IPad />
    </div>
  );
}

export default App;
