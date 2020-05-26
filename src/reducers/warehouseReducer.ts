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
    [7, 9],
    [8, 9],
    [9, 9],
    [11, 9],
    [12, 9],
    [13, 9],
    [15, 9],
    [16, 9],
    [17, 9],
    [3, 6],
    [4, 6],
    [5, 6],
    [7, 6],
    [8, 6],
    [9, 6],
    [11, 6],
    [12, 6],
    [13, 6],
    [15, 9],
  ];

  return products.reduce((acc: { [id: string]: BoxState }, value: string, index: number) => {
    acc[value] = { 
      location: rackLocations[index],
      inRack: true
    }
    return acc;
  }, {});
}

const generateBadBoxLocations = (): { [id: string]: BoxState } => {
  const inRack = true;
  return {
    "CST 964": { location: [9, 9], inRack },
    "TPH 255": { location: [8, 9], inRack },
    "DSC 743": { location: [7, 9], inRack },
    "SMX 041": { location: [5, 9], inRack },
    "RFG 411": { location: [4, 9], inRack },
    "WSH 322": { location: [11, 9], inRack },
    "MIC 099": { location: [12, 9], inRack },
    "OTV 482": { location: [13, 9], inRack },
    "MWO 901": { location: [15, 9], inRack },
    "SPK 876": { location: [16, 9], inRack },
    "PTV 555": { location: [4, 6], inRack },
    "VIR 555": { location: [5, 6], inRack },
    "BAT 917": { location: [7, 6], inRack },
    "VAC 082": { location: [8, 6], inRack },
    "DLA 413": { location: [9, 6], inRack },
    "SMK 019": { location: [11, 6], inRack },
    "BAM 223": { location: [12, 6], inRack },
    "CAM 679": { location: [13, 6], inRack },
    "IRN 590": { location: [15, 6], inRack },
  };
}
const generateGoodBoxLocations = (): { [id: string]: BoxState } => {
  const inRack = true;
  return {
    "IRN 590": { location: [9, 9], inRack },
    "CAM 679": { location: [8, 9], inRack },
    "BAM 223": { location: [7, 9], inRack },
    "SMK 019": { location: [5, 9], inRack },
    "BAT 917": { location: [4, 9], inRack },
    "DLA 413": { location: [11, 9], inRack },
    "VAC 082": { location: [12, 9], inRack },
    "VIR 555": { location: [13, 9], inRack },
    "PTV 555": { location: [15, 9], inRack },
    "SPK 876": { location: [16, 9], inRack },
    "MWO 901": { location: [4, 6], inRack },
    "OTV 482": { location: [5, 6], inRack },
    "MIC 099": { location: [7, 6], inRack },
    "DSC 743": { location: [8, 6], inRack },
    "WSH 322": { location: [9, 6], inRack },
    "RFG 411": { location: [11, 6], inRack },
    "TPH 255": { location: [12, 6], inRack },
    "CST 964": { location: [13, 6], inRack },
    "SMX 041": { location: [15, 6], inRack },
  };
}

export const initialWarehouseState: WarehouseState = {
  boxes: generateBoxLocationsAtDock()
  // boxes: generateBoxLocationsAtRacks()
  // boxes: generateBadBoxLocations()
  // boxes: generateGoodBoxLocations()
}


export type WarehouseAction =
 | { type: 'placeBox'; productCode: string, location: [number, number], inRack: boolean }
 | { type: 'restart' };

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
    case 'restart':
      return initialWarehouseState;  
    default: {
        return state;
    }
  }
}

