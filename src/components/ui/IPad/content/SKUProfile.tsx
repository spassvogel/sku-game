import React, { useEffect, useRef, useContext } from "react";
import { AppContext } from "components/context/AppProvider";
import { Categories, WMSData } from "reducers/wmsReducer";


interface Props {
  selectedProduct?: string;
}

const SKUProfile = (props: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const { state } = useContext(AppContext);
  const data = state.wms;

  useEffect(() => {
    if (!tableRef.current) return;
    const table = tableRef.current;
    
    // add highlight class 
    table.querySelectorAll(`tr[data-code="${props.selectedProduct}"]`).forEach(row => {
      row.classList.add("highlight");
      row.scrollIntoView({ block: 'end'});
    });
    return () => {
    // Remove highlight class from prevously highlighted row
      table.querySelectorAll('.highlight').forEach(row => {
        row.classList.remove("highlight");
      });  
    }
  }, [props.selectedProduct]);

  const renderContent = () => {
    return (
      <table ref={tableRef}>
        <tbody>
        <tr><th colSpan={2} className="category-header-a">A. Fast-moving</th></tr>
        {data.filter(row => row.category === Categories.A).map(row => renderRow(row))}
        <tr><th colSpan={2} className="category-header-b">B. Medium-moving</th></tr>
        {data.filter(row => row.category === Categories.B).map(row => renderRow(row))}
        <tr><th colSpan={2} className="category-header-c">C. Slow-moving</th></tr>
        {data.filter(row => row.category === Categories.C).map(row => renderRow(row))}
        <tr><th colSpan={2} className="category-header-d">D. Not-moving</th></tr>
        {data.filter(row => row.category === Categories.D).map(row => renderRow(row))}
        </tbody>
      </table>
    )
  }

  const renderRow = (row: WMSData) => {
    const categoryClasses = { 
      [Categories.A]: "cat-a",
      [Categories.B]: "cat-b",
      [Categories.C]: "cat-c",
      [Categories.D]: "cat-d",
    }
    return (
      <>
        <tr key={row.productCode} data-code={row.productCode} className={categoryClasses[row.category]}>
          <td>{row.productCode}</td>
          <td>{row.description}</td>
        </tr>
        {row.pair && (
          <tr key={`${row.productCode}-pair`} data-code={row.productCode} className={categoryClasses[row.category]}>
            <td colSpan={2} className="pair">
              {` Frequently sold with ${row.pair}`}
            </td>
          </tr>
        )}
      </>
    )
  }
  return (
    <>
      <h2>SKU velocity profile</h2>
      {renderContent()}
    </>
  )
}

export default SKUProfile;