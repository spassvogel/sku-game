import React from 'react';
import './App.css';
import Scene from 'components/Scene';
import * as PIXI  from 'pixi.js';
window.PIXI = PIXI;

function App() {
  return (
    <div className="App">
      <Scene tilemap="scenes/level1.json" />
    </div>
  );
}

export default App;
