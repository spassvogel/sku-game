import React, { useEffect, useRef, useContext } from 'react';
import { AppContext } from 'components/context/AppProvider';
import { Categories, WMSData } from 'store';
import './ipad.css';

interface Props {
  selectedProduct?: string;
}
const IPad = (props: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const { state } = useContext(AppContext);
  const data = state.wms;

  useEffect(() => {
    if (!tableRef.current) return;
    const table = tableRef.current;
    
    // add highlight class 
    const row = table.querySelector(`tr[data-code="${props.selectedProduct}"]`)
    row?.classList.add("highlight");
    row?.scrollIntoView({ block: 'end'});
    return () => {
    // Remove highlight class from prevously highlighted row
      table.querySelector(".highlight")?.classList.remove("highlight");
    }
  }, [props.selectedProduct]);

  const renderContent = () => {
    return (
      <table ref={tableRef}>
        <tbody>
        <tr><td colSpan={3} className="category-header-a">A. Fast-moving</td></tr>
        {data.filter(row => row.category === Categories.A).map(row => renderRow(row))}
        <tr><td colSpan={3} className="category-header-b">B. Medium-moving</td></tr>
        {data.filter(row => row.category === Categories.B).map(row => renderRow(row))}
        <tr><td colSpan={3} className="category-header-c">C. Slow-moving</td></tr>
        {data.filter(row => row.category === Categories.C).map(row => renderRow(row))}
        <tr><td colSpan={3} className="category-header-d">D. Not-moving</td></tr>
        {data.filter(row => row.category === Categories.D).map(row => renderRow(row))}
        </tbody>
      </table>
    )
  }

  const renderRow = (row: WMSData) => {
    return (
      <tr key={row.productCode} data-code={row.productCode}>
        <td>{row.productCode}</td>
        <td>{row.description}</td>
        <td>{row.slotting || ""}</td>
      </tr>
    )
  }

  return (
    <div className="ipad">
      <div className="content">
        <h2>SKU velocity profile</h2>
        {renderContent()}
      </div>
    </div>      
  )
}

export default IPad;