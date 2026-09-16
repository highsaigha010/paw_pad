import type { CreateSaleInput, SaleCartItem } from "@/app/features/pos/domain/pos";

const TAX_RATE = 0.08;

/**
 * Calculates POS totals in the domain layer so pricing rules stay outside React components.
 */
export function calculateSaleTotals(items: SaleCartItem[]) {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;

    return {
        subtotal,
        tax,
        total: subtotal + tax,
    };
}

/**
 * Validates the basic rules required before a sale can be completed.
 */
export function validateCreateSaleInput(input: CreateSaleInput) {
    if (!input.customerName.trim()) {
        return "Customer name is required.";
    }

    if (input.items.length === 0) {
        return "Add at least one service or product.";
    }

    const hasInvalidQuantity = input.items.some((item) => item.quantity < 1);

    if (hasInvalidQuantity) {
        return "Every cart item must have a valid quantity.";
    }

    return null;
}
