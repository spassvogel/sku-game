
export interface PickingList {
  products: string[];
  pickedProducts?: string[]; // when a product from `product` is picked it appears in this list
  guy?: number;               // who is currently picking this list
  complete?: boolean;        // when list is completely picked and the picker has returnwed with all the items 
  // clientName? 
  orderNo: string;
}

export const initialProductPickingList = [
  ["IRN 590", "CAM 679"],
  ["CAM 679", "VRL 444", "IRN 590"],
  ["RFG 411", "IRN 590", "CAM 679"],
  ["VRL 444", "SMK 019", "BAT 917", "SPK 876", "PTV 555"],
  ["SMX 041", "PTV 555", "SPK 876", "CAM 679"],
  ["BAT 917", "SMK 019", "IRN 590", "WSH 322"]
];



export const generateInitialPickingLists = (initial: string[][]): PickingList[] => {
  // the actual products are not random, but the rest of the data is
  return initial.map(products => {
    return {
      orderNo: Math.random().toString().slice(2, 9),
      products
    } 
  });
}

export type PickingListsAction =
 | { type: 'setPickingLists', pickingLists: PickingList[] }
 | { type: 'startPicking', guy: number, orderNo: string }
 | { type: 'completeProductPick', productCode: string, orderNo: string }
 | { type: 'completeOrder', orderNo: string }
 | { type: 'restart' };

 
export const pickingListsReducer = (state: PickingList[], action: PickingListsAction ) => {
  switch (action.type) {
    case 'setPickingLists':
      return action.pickingLists;
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
    case 'restart':
      return state.map(pL => ({
        ...pL,
        guy: undefined,
        complete: false,
        pickedProducts: []
      }));
    default:
      return state;
  }
}