// import React, { useState, createContext } from "react";

// // Create Context Object
// export const CounterContext = createContext([0, null]);

// // Create a provider for components to consume and subscribe to changes
// export const CounterContextProvider = props => {
//   const [count, setCount] = useState(0);

//   return (
//     <CounterContext.Provider value={[count, setCount]}>
//       {props.children}
//     </CounterContext.Provider>
//   );
// };

import React, { createContext, useReducer } from 'react';
import { AppState, initialState } from 'store';
import { gameStateReducer, GameStateAction } from 'reducers/gameStateReducer';
import { warehouseReducer, WarehouseAction } from 'reducers/warehouseReducer';

//import { productReducer, shoppingCartReducer } from './reducers';



const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AnyAction>;
}>({
  state: initialState,
  dispatch: () => null
});


type AnyAction = GameStateAction | WarehouseAction;

const reducer = (state: AppState, action: AnyAction) => {
  return {
    gameState: gameStateReducer(state.gameState, action as GameStateAction),
    wms: state.wms, // read only
    pickingLists: state.pickingLists, // read only
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