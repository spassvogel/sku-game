
export interface BoxState {
  location: [number, number];
  inRack?: boolean; // true if in a rack, false if in a dock
}

export interface WarehouseState {
  boxes: { [id: string]: BoxState }
}

export const initialWarehouseState: WarehouseState = {
  boxes: {
      // hairdryer: { location: [4, 8], product: 'hairdryer' },
      // toothbrush: { location: [5, 8], product: 'toothbrush' },
      // microwave: { location: [3, 6], product: 'microwave' },

      // microphone: { location: [3, 0], product: 'microphone' },
      // playstation: { location: [3, 1], product: 'playstation' },

      "IRN 590": { location: [3, 0] },
      "CAM 679": { location: [3, 1] },

      "PTV 555": { location: [4, 0] },
      "SPK 876": { location: [4, 1] },

      "MWO 901": { location: [5, 0] },
      "OTV 482": { location: [5, 1] },

      "MIC 099": { location: [6, 0] },
      "WSH 322": { location: [6, 1] },

      "RFG 411": { location: [7, 0] },
      "SMX 041": { location: [7, 1] },

      "DSC 743": { location: [8, 0] },
      "TPH 255": { location: [8, 1] },
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

