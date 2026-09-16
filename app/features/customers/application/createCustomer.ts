import type { CreateCustomerInput } from "@/app/features/customers/domain/customer";
import { validateCreateCustomerInput } from "@/app/features/customers/domain/customerRules";
import { postCustomer } from "@/app/features/customers/services/customerApi";

/**
 * Coordinates the create customer workflow.
 */
export async function createCustomer(input: CreateCustomerInput) {
    if (!validateCreateCustomerInput(input)) {
        throw new Error("Customer cannot be created because name, phone, and email are required.");
    }

    return postCustomer(input);
}
