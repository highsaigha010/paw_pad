import type { CreatePaymentInput, PaymentStatus } from "@/app/features/payments/domain/payment";

/**
 * Validates the minimum fields needed before creating a payment.
 */
export function validateCreatePaymentInput(input: CreatePaymentInput) {
    return Boolean(input.bookingId && input.amount && input.method);
}

/**
 * Checks whether a payment status means checkout is complete.
 */
export function isPaymentComplete(status: PaymentStatus) {
    return status === "Paid";
}
