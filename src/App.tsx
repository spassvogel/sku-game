import React, { useState } from 'react';
import './App.css';
import Scene from 'components/Scene';
import * as PIXI  from 'pixi.js';
import { Stage } from '@inlet/react-pixi';
import IPad from 'components/ui/IPad';
window.PIXI = PIXI;

function App() {
  
  const width = 21 * 32;
  const height = 32 * 13;

  const [selectedProduct, setSelectedProduct] = useState<string>();

  return (
    <div className="App">
      <Stage width={width} height={height}>
        <Scene 
          tilemap="scenes/level1.json" 
          width={width} 
          height={height}
          onProductClick={setSelectedProduct}
        />
      </Stage>
      <IPad selectedProduct={selectedProduct}/>
    </div>
  );
}

export default App;
