import type { CreateSaleInput, SaleCatalogItem, SaleTransaction } from "@/app/features/pos/domain/pos";
import { calculateSaleTotals } from "@/app/features/pos/domain/posRules";

// Temporary catalog data that stands in for records returned by the backend API.
const catalogItems: SaleCatalogItem[] = [
    { id: "service-1001", name: "Full Groom", type: "Service", price: 85 },
    { id: "service-1002", name: "Bath & Brush", type: "Service", price: 55 },
    { id: "service-1003", name: "Nail Trim", type: "Service", price: 22 },
    { id: "product-1001", name: "Hypo Shampoo", type: "Product", price: 18, stock: 14 },
    { id: "product-1002", name: "Dental Chews", type: "Product", price: 12, stock: 28 },
    { id: "product-1003", name: "Paw Balm", type: "Product", price: 16, stock: 9 },
];

// Temporary paid sale data for the POS activity panel.
const recentSales: SaleTransaction[] = [
    {
        id: "sale-3001",
        customerName: "Alyssa Santos",
        items: [{ ...catalogItems[0], quantity: 1 }],
        ...calculateSaleTotals([{ ...catalogItems[0], quantity: 1 }]),
        paymentMethod: "Card",
        status: "Paid",
    },
    {
        id: "sale-3002",
        customerName: "Marco Reyes",
        items: [{ ...catalogItems[4], quantity: 2 }],
        ...calculateSaleTotals([{ ...catalogItems[4], quantity: 2 }]),
        paymentMethod: "Cash",
        status: "Paid",
    },
];

/**
 * Loads sellable services and products from the backend API.
 */
export async function fetchSaleCatalog() {
    return catalogItems;
}

/**
 * Loads recent POS transactions from the backend API.
 */
export async function fetchRecentSales() {
    return recentSales;
}

/**
 * Sends a completed sale to the backend API.
 *
 * The future backend must create a transaction record, adjust product stock, and write an audit entry.
 */
export async function postSale(input: CreateSaleInput): Promise<SaleTransaction> {
    const totals = calculateSaleTotals(input.items);

    return {
        id: `sale-${Date.now()}`,
        customerName: input.customerName,
        items: input.items,
        ...totals,
        paymentMethod: input.paymentMethod,
        status: "Paid",
    };
}
