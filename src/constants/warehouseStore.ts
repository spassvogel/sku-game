export interface WarehouseStore {
  boxes: { [id: string]: BoxStore }
}

export interface BoxStore {
  location: [number, number];
  product: string;
}