import React, { useContext } from 'react';
import { AppContext } from 'components/context/AppProvider';
import { GameState } from 'store';
import './ipad.css';
import SKUProfile from './content/SKUProfile';
import PickingLists from './content/PickingLists';

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
        return <PickingLists />;
    }
  }

  return (
    <div className="ipad">
      <div className="content">
        {renderContent()}
      </div>
    </div>      
  )
}

export default IPad;