import React, { useState } from 'react';
import './App.css';
import Scene from 'components/Scene';
import * as PIXI  from 'pixi.js';
import IPad from 'components/ui/IPad';
import StartButton from 'components/ui/StartButton';
import { AppProvider } from 'components/context/AppProvider';
import StatusText from 'components/ui/StatusText';
import Settings from 'components/ui/Settings';
import GameOverScreen from 'components/ui/GameOverScreen';
window.PIXI = PIXI;

function App() {
  
  const width = 21 * 32;
  const height = 32 * 13;

  const [selectedProduct, setSelectedProduct] = useState<string>();

  return (
    <AppProvider>
      <div className="App">
        <Settings />
        <Scene 
          tilemap="scenes/level2.json" 
          width={width} 
          height={height}
          onProductClick={setSelectedProduct}
        />
        <IPad selectedProduct={selectedProduct}/>
        <StartButton />
        <StatusText />
        <GameOverScreen />
      </div>
    </AppProvider>
  );
}

export default App;
