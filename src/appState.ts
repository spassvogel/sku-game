import { initialWMSState, WMSData } from "reducers/wmsReducer";
import { generateInitialPickingLists, PickingList } from "reducers/pickingListsReducer";
import { initialWarehouseState, WarehouseState } from "reducers/warehouseReducer";
import { GameState } from "reducers/gameStateReducer";

export interface AppState {
  statusText: string;
  gameState: GameState,
  wms: WMSData[];
  pickingLists: PickingList[];
  warehouse: WarehouseState; // Where all the boxes are in the warehouse
  muted: boolean;
}


export const initialState: AppState = {
  statusText: "",
  gameState: GameState.placingBoxes,
  wms: initialWMSState,
  pickingLists: generateInitialPickingLists(),
  warehouse: initialWarehouseState,
  muted: localStorage.getItem('muted') === 'true',
}

