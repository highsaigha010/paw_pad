import type { CreateCustomerInput, CustomerStatus } from "@/app/features/customers/domain/customer";

/**
 * Returns the CSS class suffix for a customer status badge.
 */
export function getCustomerStatusClass(status: CustomerStatus) {
    return status.toLowerCase();
}

/**
 * Validates the minimum fields needed before creating a customer.
 */
export function validateCreateCustomerInput(input: CreateCustomerInput) {
    return Boolean(input.name && input.phone && input.email);
}
