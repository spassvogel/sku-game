import React, { createContext, useReducer } from 'react';
import { AppState, initialState } from 'appState';
import { gameStateReducer, GameStateAction } from 'reducers/gameStateReducer';
import { warehouseReducer, WarehouseAction } from 'reducers/warehouseReducer';
import { statusTextReducer, StatusTextAction } from 'reducers/statusTextReducer';
import { PickingListsAction, pickingListsReducer } from 'reducers/pickingListsReducer';


const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AnyAction>;
}>({
  state: initialState,
  dispatch: () => null
});


type AnyAction = GameStateAction | WarehouseAction | StatusTextAction | PickingListsAction;

const reducer = (state: AppState, action: AnyAction) => {
  return {
    gameState: gameStateReducer(state.gameState, action as GameStateAction),
    statusText: statusTextReducer(state.statusText, action as StatusTextAction),
    wms: state.wms, // read only
    pickingLists: pickingListsReducer(state.pickingLists, action as PickingListsAction), // read only
    warehouse: warehouseReducer(state.warehouse, action as WarehouseAction),    
  };
};

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };