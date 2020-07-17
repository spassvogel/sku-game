import React, { createContext, useReducer } from 'react';
import { AppState, initialState } from 'appState';
import { gameStateReducer, GameStateAction } from 'reducers/gameStateReducer';
import { warehouseReducer, WarehouseAction } from 'reducers/warehouseReducer';
import { statusTextReducer, StatusTextAction } from 'reducers/statusTextReducer';
import { PickingListsAction, pickingListsReducer } from 'reducers/pickingListsReducer';
import { mutedReducer, MutedReducerAction } from 'reducers/mutedReducer';
import { TimeReducerAction, timeReducer } from 'reducers/timeReducer';
import { wmsReducer, WMSAction } from 'reducers/wmsReducer';


const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AnyAction>;
}>({
  state: initialState,
  dispatch: () => null
});


export type AnyAction = GameStateAction
 | WMSAction
 | WarehouseAction
 | StatusTextAction
 | PickingListsAction 
 | MutedReducerAction
 | TimeReducerAction;

const reducer = (state: AppState, action: AnyAction) => {
  return {
    gameState: gameStateReducer(state.gameState, action as GameStateAction),
    statusText: statusTextReducer(state.statusText, action as StatusTextAction),
    wms: wmsReducer(state.wms, action as WMSAction),
    pickingLists: pickingListsReducer(state.pickingLists, action as PickingListsAction), 
    warehouse: warehouseReducer(state.warehouse, action as WarehouseAction, state.wms),
    muted: mutedReducer(state.muted, action as MutedReducerAction), // todo: settingsreducer?
    time: timeReducer(state.time, action as TimeReducerAction)    
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