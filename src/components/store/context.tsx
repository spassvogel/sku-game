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
import { WMSData, Categories } from 'constants/wmsData';

//import { productReducer, shoppingCartReducer } from './reducers';


interface StoreState {
  wms: WMSData[];
}

const initialState: StoreState = {
  wms: [{
    category: Categories.A,
    productCode: "IRN 590",
    description: "Clothes Iron",
  }, {
    category: Categories.A,
    productCode: "CAM 679",
    description: "Digital Camera",
  }, {
    category: Categories.B,
    productCode: "PTV 555",
    description: "Plasma TV Set",
    slotting: "Usually sold with SPK 876"
  }, {
    category: Categories.B,
    productCode: "SPK 876",
    description: "Home Theatre System/Speaker System",
    slotting: "Usually sold with PTV 555"
  }, {
    category: Categories.B,
    productCode: "MWO 901",
    description: "Microwave Oven",
  }, {
    category: Categories.B,
    productCode: "OTV 482",
    description: "OLED TV Set",
  }, {
    category: Categories.C,
    productCode: "MIC 099",
    description: "Microphone",
    slotting: "Usually sold with DSC 743 as a karaoke set"
  }, {
    category: Categories.C,
    productCode: "WSH 322",
    description: "Washing Machine",
  }, {
    category: Categories.C,
    productCode: "RFG 411",
    description: "Refrigerator",
  }, {
    category: Categories.C,
    productCode: "SMX 041",
    description: "Stand Mixer",
  }, {
    category: Categories.C,
    productCode: "DSC 743",
    description: "Disco Ball",
    slotting: "Usually sold with MIC 099 as a karaoke set"
  }, {
    category: Categories.D,
    productCode: "TPH 255",
    description: "Telephone",
  }, {
    category: Categories.D,
    productCode: "CST 964",
    description: "Cassette Player",      
  }],
}

const AppContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

type Action =
 | { type: 'ADD' }
 | { type: 'CREATE', create: object }
 | { type: 'DELETE', id: string };

const mainReducer = (state: StoreState, action: Action) => ({
    wms: state.wms
  //products: productReducer(products, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };