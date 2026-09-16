// Lists payment states used during checkout.
export type PaymentStatus = "Pending" | "Processing" | "Paid" | "Failed";

// Lists supported payment methods for checkout.
export type PaymentMethodType = "Cash" | "Card" | "Online";

// Represents a checkout payment for one booking.
export type Payment = {
    id: string;
    bookingId: string;
    amount: string;
    method: PaymentMethodType;
    status: PaymentStatus;
};

// Represents the input needed to create a payment.
export type CreatePaymentInput = {
    bookingId: string;
    amount: string;
    method: PaymentMethodType;
};
