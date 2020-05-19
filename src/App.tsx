import React, { useState } from 'react';
import './App.css';
import Scene from 'components/Scene';
import * as PIXI  from 'pixi.js';
import { Stage } from '@inlet/react-pixi';
import IPad from 'components/ui/IPad';
import StartButton from 'components/ui/StartButton';
import { AppProvider } from 'components/context/AppProvider';
window.PIXI = PIXI;

function App() {
  
  const width = 21 * 32;
  const height = 32 * 13;

  const [selectedProduct, setSelectedProduct] = useState<string>();

  return (
    <AppProvider>
      <div className="App">
        <Scene 
          tilemap="scenes/level1.json" 
          width={width} 
          height={height}
          onProductClick={setSelectedProduct}
        />
        <IPad selectedProduct={selectedProduct}/>
        <StartButton />
      </div>
    </AppProvider>
  );
}

export default App;
