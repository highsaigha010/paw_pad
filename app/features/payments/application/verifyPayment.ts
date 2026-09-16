import { isPaymentComplete } from "@/app/features/payments/domain/paymentRules";
import { fetchPaymentStatus } from "@/app/features/payments/services/paymentApi";

/**
 * Coordinates payment verification after the processor returns a status.
 */
export async function verifyPayment(paymentId: string) {
    const status = await fetchPaymentStatus(paymentId);

    return {
        status,
        complete: isPaymentComplete(status),
    };
}
