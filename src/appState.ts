import { initialWMSState, WMSData } from "reducers/wmsReducer";
import { generateInitialPickingLists, PickingList, initialProductPickingList } from "reducers/pickingListsReducer";
import { initialWarehouseState, WarehouseState } from "reducers/warehouseReducer";
import { GameState } from "reducers/gameStateReducer";

export interface AppState {
  statusText: string;
  gameState: GameState,
  wms: WMSData[];
  pickingLists: PickingList[];
  warehouse: WarehouseState; // Where all the boxes are in the warehouse
  muted: boolean;
  time: number;
}


export const initialState: AppState = {
  statusText: "",
  gameState: GameState.intro,
  wms: initialWMSState,
  pickingLists: generateInitialPickingLists(initialProductPickingList),
  warehouse: initialWarehouseState,
  muted: localStorage.getItem('muted') === 'true',
  time: 0,
}

