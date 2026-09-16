import type { CreatePaymentInput } from "@/app/features/payments/domain/payment";
import { validateCreatePaymentInput } from "@/app/features/payments/domain/paymentRules";
import { postPayment } from "@/app/features/payments/services/paymentApi";

/**
 * Coordinates the create payment workflow for booking checkout.
 */
export async function createPayment(input: CreatePaymentInput) {
    if (!validateCreatePaymentInput(input)) {
        throw new Error("Payment cannot be created because required fields are missing.");
    }

    return postPayment(input);
}
