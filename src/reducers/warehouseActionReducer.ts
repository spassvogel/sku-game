import { AnyAction } from "components/context/AppProvider";

export interface WarehouseAction {
  guy: number;
  target: [number, number];
  onComplete: AnyAction;
}