
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

export enum GameState {
  placingBoxes,
  pickingBoxes,
}

export interface StoreState {
  gameState: GameState,
  wms: WMSData[];
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
}