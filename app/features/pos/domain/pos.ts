export type SaleItemType = "Service" | "Product";

export type PaymentMethod = "Cash" | "Card" | "GCash";

export type SaleStatus = "Draft" | "Paid" | "Voided";

export type SaleCatalogItem = {
    id: string;
    name: string;
    type: SaleItemType;
    price: number;
    stock?: number;
};

export type POSBookingOption = {
    id: string;
    date: string;
    time: string;
    customerName: string;
    petName: string;
    serviceName: string;
    servicePrice: number;
};

export type SaleCartItem = SaleCatalogItem & {
    quantity: number;
};

export type SaleTransaction = {
    id: string;
    customerName: string;
    items: SaleCartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: PaymentMethod;
    status: SaleStatus;
};

export type CreateSaleInput = {
    customerName: string;
    items: SaleCartItem[];
    paymentMethod: PaymentMethod;
};
