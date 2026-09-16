"use server";

import type { CreateSaleInput } from "@/app/features/pos/domain/pos";
import { validateCreateSaleInput } from "@/app/features/pos/domain/posRules";
import { postSale } from "@/app/features/pos/services/posApi";

/**
 * Completes a POS sale after validating the cart and selected payment method.
 */
export async function createSale(input: CreateSaleInput) {
    const error = validateCreateSaleInput(input);

    if (error) {
        return {
            ok: false,
            message: error,
        };
    }

    const sale = await postSale(input);

    return {
        ok: true,
        message: `Sale ${sale.id} was completed.`,
    };
}
