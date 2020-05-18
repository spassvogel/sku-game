import React from 'react';
import './ipad.css';
import { WMSData, Categories } from 'constants/wmsData';

const data: WMSData[] = [{
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
}];

const IPad = () => {

    const renderContent = () => {
        return (
            <table>
                <tr><td colSpan={3} className="category-header-a">A. Fast-moving</td></tr>
                {data.filter(row => row.category === Categories.A).map(row => renderRow(row))}
                <tr><td colSpan={3} className="category-header-b">B. Medium-moving</td></tr>
                {data.filter(row => row.category === Categories.B).map(row => renderRow(row))}
                <tr><td colSpan={3} className="category-header-c">C. Slow-moving</td></tr>
                {data.filter(row => row.category === Categories.C).map(row => renderRow(row))}
                <tr><td colSpan={3} className="category-header-d">D. Not-moving</td></tr>
                {data.filter(row => row.category === Categories.D).map(row => renderRow(row))}
            </table>
        )
    }

    const renderRow = (row: WMSData) => {
        return (
            <tr>
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