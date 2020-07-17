import React, { useState, useContext, useEffect, useRef } from 'react';
import './App.css';
import Scene from 'components/Scene';
import * as PIXI  from 'pixi.js';
import IPad from 'components/ui/IPad';
import StartButton from 'components/ui/StartButton';
import { AppProvider, AppContext } from 'components/context/AppProvider';
import StatusText from 'components/ui/StatusText';
import Settings from 'components/ui/Settings';
import GameOverScreen from 'components/ui/GameOverScreen';
import IntroScreen from 'components/ui/IntroScreen';
import PlayerBridge from 'components/playerBridge';
import { GameData } from 'components/playerBridge/GameData';
window.PIXI = PIXI;

const INITIAL_WIDTH = 960;
const INITIAL_HEIGHT = 480;

function App() {
  
  const width = 21 * 32;
  const height = 32 * 13;

  const [selectedProduct, setSelectedProduct] = useState<string>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // when width or height of window is smaller than INITIAL_WIDTH or INITIAL_HEIGHT, scale down
    const resize = () => {
      if(window.innerWidth - INITIAL_WIDTH < 0 || window.innerHeight - INITIAL_HEIGHT < 0){
        const diffW = window.innerWidth - INITIAL_WIDTH;
        const diffH =  window.innerHeight - INITIAL_HEIGHT;
        
        let scale = 1;
        if (diffW < diffH) {
          scale = window.innerWidth / INITIAL_WIDTH;
        } else {
          scale =  window.innerHeight / INITIAL_HEIGHT;
        }
        ref.current!.style.transform = `scale(${scale}) translate(-50%, -50%)`;
      } else {
        ref.current!.style.transform = 'translate(-50%, -50%)';
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    }
  }, []);

  return (
    <>
      <AppProvider>
        <AppAwareBridge />
        <div className="App" ref={ref}>
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
          <IntroScreen />
          <GameOverScreen />
        </div>
      </AppProvider>
    </>
  );
}

export default App;

const AppAwareBridge = () => {
  const {dispatch} = useContext(AppContext);

  const handleGameDataReceived = (data: GameData) => {
    if (data.content.wms) {
      dispatch({ type: 'setWMS', wms: data.content.wms });
    }
    if (data.content.pickingLists) {
      dispatch({ type: 'setPickingLists', pickingLists: data.content.pickingLists });
    }
    dispatch({ type: 'restart'}); // ensure the warehouse state gets reinitialized based on the current WMS
    dispatch({ type: 'intro'});
  }

  return (
    <PlayerBridge gameDataReceived={handleGameDataReceived}/>
  )
}