
export interface PickingList {
  products: string[];
  pickedProducts?: string[]; // when a product from `product` is picked it appears in this list
  // clientName? 
  orderNo: string;
}

export const generateInitialPickingLists = (): PickingList[] => {
  // the actual products are not random, but the rest of the data is
  const productPickList = [
    ["MIC 099", "CST 964", "DSC 743"],
    ["WSH 322", "MWO 901"],
    ["SMX 041", "OTV 482", "CAM 679"]
  ];

  return productPickList.map(products => {
    return {
      orderNo: Math.random().toString().slice(2, 9),
      products
    } 
  });
}