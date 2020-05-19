
export enum GameState {
  placingBoxes,
  pickingBoxes,
}

export interface WMSData {
  category: Categories;
  productCode: string;
  description: string; 
  slotting?: string;
}

export enum Categories {
  A,
  B,
  C,
  D
}

export interface PickingList {
  products: string[];
  pickedProducts?: string[]; // when a product from `product` is picked it appears in this list
  // clientName? 
  orderNo: string;
}

export interface StoreState {
  gameState: GameState,
  wms: WMSData[];
  pickingLists: PickingList[];
}

const generatePickingList = (): PickingList[] => {
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

export const initialState: StoreState = {
  gameState: GameState.placingBoxes,
  wms: [{
    category: Categories.A,
    productCode: "IRN 590",
    description: "Clothes Iron",
  }, {
    category: Categories.A,
    productCode: "CAM 679",
    description: "Digital Camera",
  }, {
    category: Categories.B,
    productCode: "PTV 555",
    description: "Plasma TV Set",
    slotting: "Usually sold with SPK 876"
  }, {
    category: Categories.B,
    productCode: "SPK 876",
    description: "Home Theatre System/Speaker System",
    slotting: "Usually sold with PTV 555"
  }, {
    category: Categories.B,
    productCode: "MWO 901",
    description: "Microwave Oven",
  }, {
    category: Categories.B,
    productCode: "OTV 482",
    description: "OLED TV Set",
  }, {
    category: Categories.C,
    productCode: "MIC 099",
    description: "Microphone",
    slotting: "Usually sold with DSC 743 as a karaoke set"
  }, {
    category: Categories.C,
    productCode: "WSH 322",
    description: "Washing Machine",
  }, {
    category: Categories.C,
    productCode: "RFG 411",
    description: "Refrigerator",
  }, {
    category: Categories.C,
    productCode: "SMX 041",
    description: "Stand Mixer",
  }, {
    category: Categories.C,
    productCode: "DSC 743",
    description: "Disco Ball",
    slotting: "Usually sold with MIC 099 as a karaoke set"
  }, {
    category: Categories.D,
    productCode: "TPH 255",
    description: "Telephone",
  }, {
    category: Categories.D,
    productCode: "CST 964",
    description: "Cassette Player",      
  }],
  pickingLists: generatePickingList()
}

