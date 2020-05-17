import { WarehouseStore } from "constants/warehouseStore";

export const reducer = (state: WarehouseStore, action: Action) => {
    switch (action.type) {
        case 'placeBoxInRack':
            const boxes = { 
                ...state.boxes,
                [action.boxName]: {
                    ...state.boxes[action.boxName],
                    location: action.rack
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
  | { type: 'placeBoxInRack'; boxName: string, rack: [number, number] };

  export const initialState: WarehouseStore = {
      boxes: {
          hairdryer: { location: [4, 8], product: 'hairdryer' },
          microwave: { location: [3, 6], product: 'microwave' }
      }
}