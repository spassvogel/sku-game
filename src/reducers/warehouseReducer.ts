
export interface BoxState {
  location: [number, number];
  inRack?: boolean; // true if in a rack, false if in a dock
}

export interface WarehouseState {
  boxes: { [id: string]: BoxState }
}
const inRack = true; // for debugging
export const initialWarehouseState2: WarehouseState = {
  boxes: {
      // hairdryer: { location: [4, 8], product: 'hairdryer' },
      // toothbrush: { location: [5, 8], product: 'toothbrush' },
      // microwave: { location: [3, 6], product: 'microwave' },

      // microphone: { location: [3, 0], product: 'microphone' },
      // playstation: { location: [3, 1], product: 'playstation' },

      "IRN 590": { location: [3, 0], inRack },
      "CAM 679": { location: [3, 1], inRack },

      "PTV 555": { location: [4, 0], inRack },
      "SPK 876": { location: [4, 1], inRack },

      "MWO 901": { location: [5, 0], inRack },
      "OTV 482": { location: [5, 1], inRack },

      "MIC 099": { location: [6, 0], inRack },
      "WSH 322": { location: [6, 1], inRack },

      "RFG 411": { location: [7, 0], inRack },
      "SMX 041": { location: [7, 1], inRack },

      "DSC 743": { location: [8, 0], inRack },
      "TPH 255": { location: [8, 1], inRack },
  }
}
export const initialWarehouseState: WarehouseState = {
  boxes: {
      // hairdryer: { location: [4, 8], product: 'hairdryer' },
      // toothbrush: { location: [5, 8], product: 'toothbrush' },
      // microwave: { location: [3, 6], product: 'microwave' },

      // microphone: { location: [3, 0], product: 'microphone' },
      // playstation: { location: [3, 1], product: 'playstation' },

      "IRN 590": { location: [3, 6], inRack: true },
      "CAM 679": { location: [3, 8], inRack: true },

      "PTV 555": { location: [4, 6], inRack: true },
      "SPK 876": { location: [4, 8], inRack: true },

      "MWO 901": { location: [5, 6], inRack: true },
      "OTV 482": { location: [5, 8], inRack: true },

      "MIC 099": { location: [6, 6], inRack: true },
      "WSH 322": { location: [6, 8], inRack: true },

      "RFG 411": { location: [7, 6], inRack: true },
      "SMX 041": { location: [7, 8], inRack: true },

      "DSC 743": { location: [8, 6], inRack: true },
      "TPH 255": { location: [8, 8], inRack: true },
  }
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

