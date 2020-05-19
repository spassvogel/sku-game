import React, { useContext } from "react";
import { AppContext } from "components/context/AppProvider";
import { PickingList } from "reducers/pickingListsReducer";

const PickingLists = () => {
  const { state } = useContext(AppContext);
  const data = state.pickingLists;
  const productNameMap = state.wms.reduce((acc: {[key: string]: string}, value) => {
    if (!acc[value.productCode]) {
      acc[value.productCode] = value.description;
    };
    return acc;
  }, {});

  // useEffect(() => {
  //   if (!tableRef.current) return;
  //   const table = tableRef.current;
    
  //   // add highlight class 
  //   const row = table.querySelector(`tr[data-code="${props.selectedProduct}"]`)
  //   row?.classList.add("highlight");
  //   row?.scrollIntoView({ block: 'end'});
  //   return () => {
  //   // Remove highlight class from prevously highlighted row
  //     table.querySelector(".highlight")?.classList.remove("highlight");
  //   }
  // }, [props.selectedProduct]);

  const renderContent = () => {
    return (
      data.map(pickingList => (
        <div>
          {renderPickingList(pickingList)}
        </div>
      ))
    )
  }

  const renderPickingList = (pList: PickingList) => {
    return (
      <table>
        <tbody>
          <tr>
            <td colSpan={3}>Order no: {pList.orderNo}</td>
          </tr>
          { pList.products.map(p => renderProduct(p)) }
        </tbody>
      </table>
    )
  }

  const renderProduct = (productCode: string) => (
    <tr>
      <td></td>
      <td>{productCode}</td>
      <td>{productNameMap[productCode]}</td>
    </tr>
  )

  return (
    <>
      <h2>Picking lists</h2>
      {renderContent()}
    </>
  )
}

export default PickingLists;