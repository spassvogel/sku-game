import { WarehouseStore } from "constants/warehouseStore";

export const reducer = (state: WarehouseStore, action: Action) => {
    switch (action.type) {
        case 'placeBox':
            const boxes = { 
                ...state.boxes,
                [action.productCode]: {
                    ...state.boxes[action.productCode],
                    location: action.location
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

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'placeBox'; productCode: string, location: [number, number] };

export const initialState: WarehouseStore = {
    boxes: {
        // hairdryer: { location: [4, 8], product: 'hairdryer' },
        // toothbrush: { location: [5, 8], product: 'toothbrush' },
        // microwave: { location: [3, 6], product: 'microwave' },

        // microphone: { location: [3, 0], product: 'microphone' },
        // playstation: { location: [3, 1], product: 'playstation' },

        "IRN 590": { location: [3, 0], product: 'headphones' },
        "CAM 679": { location: [3, 1], product: 'socks' },

        "PTV 555": { location: [4, 0], product: 'chair' },
        "SPK 876": { location: [4, 1], product: 'socks' },

        "MWO 901": { location: [5, 0], product: 'plates' },
        "OTV 482": { location: [5, 1], product: 'knife' },

        "MIC 099": { location: [6, 0], product: 'plates' },
        "WSH 322": { location: [6, 1], product: 'knife' },
 
        "RFG 411": { location: [7, 0], product: 'plates' },
        "SMX 041": { location: [7, 1], product: 'knife' },

        "DSC 743": { location: [8, 0], product: 'plates' },
        "TPH 255": { location: [8, 1], product: 'knife' },
    }
}