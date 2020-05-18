import { WarehouseStore } from "constants/warehouseStore";

export const reducer = (state: WarehouseStore, action: Action) => {
    switch (action.type) {
        case 'placeBox':
            const boxes = { 
                ...state.boxes,
                [action.boxName]: {
                    ...state.boxes[action.boxName],
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
  | { type: 'placeBox'; boxName: string, location: [number, number] };

export const initialState: WarehouseStore = {
    boxes: {
        hairdryer: { location: [4, 8], product: 'hairdryer' },
        toothbrush: { location: [5, 8], product: 'toothbrush' },
        microwave: { location: [3, 6], product: 'microwave' },

        microphone: { location: [3, 0], product: 'microphone' },
        playstation: { location: [3, 1], product: 'playstation' },

        "IRN 590": { location: [4, 0], product: 'headphones' },
        "CAM 679": { location: [4, 1], product: 'socks' },

        chair: { location: [5, 0], product: 'chair' },
        tabl: { location: [5, 1], product: 'socks' },

        plates: { location: [6, 0], product: 'plates' },
        knife: { location: [6, 1], product: 'knife' }
    }
}