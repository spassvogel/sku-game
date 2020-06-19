import { initialWMSState } from "./wmsReducer";

export interface BoxState {
  location: [number, number];
  zone?: string; // A-C: in rack, D: trash, undefined: dock
}

export interface WarehouseState {
  boxes: { [id: string]: BoxState }
}

const generateBoxLocationsAtDock = () => {
  const products = initialWMSState.map(p => p.productCode);
  products.sort(() => (0.5 - Math.random()));
  return products.reduce((acc: { [id: string]: BoxState }, value: string, index: number) => {
    acc[value] = { 
      location: [8 + index, 1]
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
      zone: "A"
    }
    return acc;
  }, {});
}

const generateBadBoxLocations = (): { [id: string]: BoxState } => {
  const inRack = true;
  return {
    "CST 964": { location: [9, 9] },
    "TPH 255": { location: [8, 9] },
    "DSC 743": { location: [7, 9] },
    "SMX 041": { location: [5, 9] },
    "RFG 411": { location: [4, 9] },
    "WSH 322": { location: [11, 9] },
    "MIC 099": { location: [12, 9] },
    "OTV 482": { location: [13, 9] },
    "MWO 901": { location: [15, 9] },
    "SPK 876": { location: [16, 9] },
    "PTV 555": { location: [4, 6] },
    "VIR 555": { location: [5, 6] },
    "BAT 917": { location: [7, 6] },
    "VAC 082": { location: [8, 6] },
    "DLA 413": { location: [9, 6] },
    "SMK 019": { location: [11, 6] },
    "BAM 223": { location: [12, 6] },
    "CAM 679": { location: [13, 6] },
    "IRN 590": { location: [15, 6] },
  };
}
const generateGoodBoxLocations = (): { [id: string]: BoxState } => {
  
  return {
    // fast movers
    "IRN 590": { location: [16, 8], zone: "A" },
    "CAM 679": { location: [17, 8], zone: "A" },
    "BAT 917": { location: [16, 6], zone: "A" },
    "SMK 019": { location: [17, 6], zone: "A" },

    // medium movers
    "VRL 444": { location: [11, 8], zone: "B" },    
    "PTV 555": { location: [11, 6], zone: "B" },
    "SPK 876": { location: [12, 6], zone: "B" },

    // slow movers
    "WSH 322": { location: [6, 8], zone: "C" },
    "SMX 041": { location: [7, 8], zone: "C" },
    "RFG 411": { location: [6, 6], zone: "C" },

    // non movers (trash)
    "TPH 255": { location: [1, 6], zone: "D" },
    "CST 964": { location: [1, 8], zone: "D"},
  };
}

export const initialWarehouseState: WarehouseState = {
  boxes: generateBoxLocationsAtDock()
  // boxes: generateBoxLocationsAtRacks()
  // boxes: generateBadBoxLocations()
  // boxes: generateGoodBoxLocations()
}


export type WarehouseAction =
 | { type: 'placeBox'; productCode: string, location: [number, number], zone?: string }
 | { type: 'restart' }
 | { type: 'cheat' };

export const warehouseReducer = (state: WarehouseState, action: WarehouseAction) => {
  switch (action.type) {
    case 'cheat': {
      return { boxes: generateGoodBoxLocations() };
    }
    case 'placeBox':
      const { location, zone } = action; 
      const boxes = { 
        ...state.boxes,
        [action.productCode]: {
            ...state.boxes[action.productCode],
            location,
            zone,
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

