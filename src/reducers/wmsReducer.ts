
export enum Categories {
  A = "A", //these get compared to the zones in the tilemap
  B = "B",
  C = "C",
  D = "D"
}

export interface WMSData {
  category: Categories;
  productCode: string;
  description: string; 
  pair?: string;
}

export const initialWMSState = [{
  category: Categories.A,
  productCode: "IRN 590",
  description: "Clothes iron",
}, {
  category: Categories.A,
  productCode: "CAM 679",
  description: "Digital camera",
}, {
  category: Categories.A,
  productCode: "SMK 019",
  description: "Smoke detector",
  pair: "BAT 917"
}, {
  category: Categories.A,
  productCode: "BAT 917",
  description: "Battery charger",
  pair: "SMK 019"
}, {
  category: Categories.B,
  productCode: "VRL 444",
  description: "VR headset",
}, {
  category: Categories.B,
  productCode: "PTV 555",
  description: "Plasma TV",
  pair: "SPK 876"
}, {
  category: Categories.B,
  productCode: "SPK 876",
  description: "Speaker system",
  pair: "PTV 555"
}, {
  category: Categories.C,
  productCode: "WSH 322",
  description: "Washing machine",
}, {
  category: Categories.C,
  productCode: "RFG 411",
  description: "Refrigerator",
}, {
  category: Categories.C,
  productCode: "SMX 041",
  description: "Stand mixer",
}, {
  category: Categories.D,
  productCode: "TPH 255",
  description: "Telephone",
}, {
  category: Categories.D,
  productCode: "CST 964",
  description: "Cassette player",
}]