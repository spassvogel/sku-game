
export interface PickingList {
  products: string[];
  pickedProducts?: string[]; // when a product from `product` is picked it appears in this list
  guy?: number;               // who is currently picking this list
  complete?: boolean;        // when list is completely picked and the picker has returnwed with all the items 
  // clientName? 
  orderNo: string;
}

export const generateInitialPickingLists = (): PickingList[] => {
  // the actual products are not random, but the rest of the data is
  const productPickingList = [
    ["MIC 099", "MWO 901", "DSC 743"],
    ["WSH 322"],
    ["SMX 041", "OTV 482", "CAM 679"],
    ["SMK 019", "BAT 917"],
    ["VAC 082"],
    ["SPK 876", "PTV 555", "DLA 413"],
    ["IRN 590"],
    ["BAM 223"],
    ["DSC 743", "MIC 099"],
    ["DLA 413"],
    ["DLA 413"],
    ["SMK 019", "BAT 917", "RFG 411"],
    ["IRN 590"],
    ["DLA 413", "VAC 082"],
    ["PTV 555", "SPK 876"],
    ["SMK 019", "BAT 917"],
    ["VIR 555"],
    ["CAM 679", "IRN 590"],
    ["BAM 223"],
    ["IRN 590"],
    ["BAM 223", "VAC 082"],
    ["SMK 019", "BAT 917"],
    ["VIR 555"],
    ["VIR 555"],
    ["CAM 679", "BAM 223"],
    ["SPK 876", "PTV 555"]
  ];

  return productPickingList.map(products => {
    return {
      orderNo: Math.random().toString().slice(2, 9),
      products
    } 
  });
}

export type PickingListsAction =
 | { type: 'startPicking', guy: number, orderNo: string }
 | { type: 'completeProductPick', productCode: string, orderNo: string }
 | { type: 'completeOrder', orderNo: string };

 
export const pickingListsReducer = (state: PickingList[], action: PickingListsAction ) => {
  switch (action.type) {
    case 'startPicking':
      return state.map(pL => {
        if (pL.orderNo === action.orderNo) {
          return { 
            ...pL,
            guy: action.guy
          }
        }
        return pL;
      })
    case 'completeProductPick':
      return state.map(pL => {
        if (pL.orderNo === action.orderNo) {
          return { 
            ...pL,
            pickedProducts: [ 
              ...pL.pickedProducts || [], 
              action.productCode
            ]
          }
        }
        return pL;
      })
    case 'completeOrder':
      return state.map(pL => {
        if (pL.orderNo === action.orderNo) {
          return { 
            ...pL,
            complete: true
          }
        }
        return pL;
      });
    default:
      return state;
  }
}