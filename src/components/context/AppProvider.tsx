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
import { StoreState, initialState } from 'store';
import { gameStateReducer, GameStateAction } from 'reducers/gameStateReducer';

//import { productReducer, shoppingCartReducer } from './reducers';



const AppContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<AnyAction>;
}>({
  state: initialState,
  dispatch: () => null
});
// const AppContext = createContext<[StoreState, React.Dispatch<AnyAction>]>(
//   [initialState, () => null]
// );

type Action =
 | { type: 'ADD' }
 | { type: 'CREATE', create: object }
 | { type: 'DELETE', id: string };

type AnyAction = Action | GameStateAction;

const reducer = (state: StoreState = initialState, action: AnyAction) => {
  return {
    gameState: gameStateReducer(state.gameState, action as GameStateAction),
    wms: state.wms, // read only
  };
  //products: productReducer(products, action),
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