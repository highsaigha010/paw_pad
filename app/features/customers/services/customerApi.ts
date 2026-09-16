import type { CreateCustomerInput, Customer, CustomerTask } from "@/app/features/customers/domain/customer";

// Temporary customer data that stands in for records returned by the backend API.
const customers: Customer[] = [
    {
        id: "customer-1001",
        name: "Alyssa Santos",
        phone: "+1 (555) 014-8821",
        email: "alyssa@example.com",
        pets: "Mochi, Koko",
        visits: "14",
        status: "Active",
        lastVisit: "Aug 28",
    },
    {
        id: "customer-1002",
        name: "Marco Reyes",
        phone: "+1 (555) 019-3412",
        email: "marco@example.com",
        pets: "Bella",
        visits: "8",
        status: "Active",
        lastVisit: "Aug 30",
    },
    {
        id: "customer-1003",
        name: "Dana Cruz",
        phone: "+1 (555) 011-7044",
        email: "dana@example.com",
        pets: "Rocky",
        visits: "3",
        status: "New",
        lastVisit: "Aug 31",
    },
    {
        id: "customer-1004",
        name: "Kai Lim",
        phone: "+1 (555) 018-2209",
        email: "kai@example.com",
        pets: "Luna, Milo",
        visits: "11",
        status: "Active",
        lastVisit: "Aug 25",
    },
];

// Temporary task data that stands in for follow-up records returned by the backend API.
const customerTasks: CustomerTask[] = [
    { id: "task-2001", title: "Confirm Dana Cruz contact details" },
    { id: "task-2002", title: "Send Mochi grooming aftercare note" },
    { id: "task-2003", title: "Review Luna allergy preference" },
];

/**
 * Loads customers from the backend API.
 *
 * This currently returns local data until the REST backend is available.
 */
export async function fetchCustomers() {
    return customers;
}

/**
 * Loads customer follow-up tasks from the backend API.
 */
export async function fetchCustomerTasks() {
    return customerTasks;
}

/**
 * Sends a create customer request to the backend API.
 */
export async function postCustomer(input: CreateCustomerInput): Promise<Customer> {
    return {
        ...input,
        id: "customer-draft",
        visits: "0",
        status: "New",
        lastVisit: "Not visited",
    };
}
