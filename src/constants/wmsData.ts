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