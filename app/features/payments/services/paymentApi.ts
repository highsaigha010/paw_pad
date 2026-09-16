import type { CreatePaymentInput, Payment } from "@/app/features/payments/domain/payment";

/**
 * Sends a create payment request to the backend API.
 *
 * This currently returns local data until payment processing is integrated.
 */
export async function postPayment(input: CreatePaymentInput): Promise<Payment> {
    return {
        ...input,
        id: "payment-draft",
        status: "Processing",
    };
}

/**
 * Requests the latest payment status from the backend API.
 */
export async function fetchPaymentStatus(paymentId: string) {
    void paymentId;

    return "Paid" as const;
}
