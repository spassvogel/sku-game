import React, { useContext } from 'react';
import { AppContext } from 'components/context/AppProvider';
import './ipad.css';
import SKUProfile from './content/SKUProfile';
import PickingLists from './content/PickingLists';
import { GameState } from 'reducers/gameStateReducer';

interface Props {
  selectedProduct?: string;
}

const IPad = (props: Props) => {
  const { state } = useContext(AppContext);
  const { gameState } = state;


  const renderContent = () => {
    switch (gameState) {
      case GameState.placingBoxes:
        return <SKUProfile selectedProduct={props.selectedProduct} />;
      case GameState.pickingBoxes:
      case GameState.complete:
        return <PickingLists />;
    }
  }

  return (
    <div 
      className="ipad"
      style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/ui/ipad.png)`}}
    >
      <div className="content">
        {renderContent()}
      </div>
    </div>      
  )
}

export default IPad;