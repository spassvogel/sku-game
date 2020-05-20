import { initialWMSState } from "./wmsReducer";

export interface BoxState {
  location: [number, number];
  inRack?: boolean; // true if in a rack, false if in a dock
}

export interface WarehouseState {
  boxes: { [id: string]: BoxState }
}

const generateBoxLocationsAtDock = () => {
  const products = initialWMSState.map(p => p.productCode);
  products.sort(() => (0.5 - Math.random()));
  return products.reduce((acc: { [id: string]: BoxState }, value: string, index: number) => {
    acc[value] = { 
      location: [1 + index, 1]
    }
    return acc;
  }, {});
}

// Use this for debugging. It shows a warehouse where all the boxes are placed
const generateBoxLocationsAtRacks = () => {
  const products = initialWMSState.map(p => p.productCode);
  products.sort(() => (0.5 - Math.random()));
  const rackLocations: [number, number][] = [
    [3, 9],
    [4, 9],
    [5, 9],
    [6, 9],
    [7, 9],
    [8, 9],
    [9, 9],
    [11, 9],
    [12, 9],
    [13, 9],
    [14, 9],
    [15, 9],
    [16, 9],
    [17, 9],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 6],
    [8, 6],
  ];

  return products.reduce((acc: { [id: string]: BoxState }, value: string, index: number) => {
    acc[value] = { 
      location: rackLocations[index],
      inRack: true
    }
    return acc;
  }, {});
}

export const initialWarehouseState: WarehouseState = {
  // boxes: generateBoxLocationsAtDock()
  boxes: generateBoxLocationsAtRacks()
}


export type WarehouseAction =
 | { type: 'placeBox'; productCode: string, location: [number, number], inRack: boolean };

export const warehouseReducer = (state: WarehouseState, action: WarehouseAction) => {
  switch (action.type) {
      case 'placeBox':
        const { location, inRack } = action; 
        const boxes = { 
          ...state.boxes,
          [action.productCode]: {
              ...state.boxes[action.productCode],
              location,
              inRack
          }
        }
        return { 
          ...state,
          boxes
        } ;
    default: {
        return state;
    }
  }
}

