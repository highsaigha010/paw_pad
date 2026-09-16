import { fetchCustomers, fetchCustomerTasks } from "@/app/features/customers/services/customerApi";

/**
 * Prepares the customer directory data needed by the presentation layer.
 */
export async function getCustomerDirectoryData() {
    const [customers, customerTasks] = await Promise.all([
        fetchCustomers(),
        fetchCustomerTasks(),
    ]);

    return {
        customers,
        customerTasks,
        summary: [
            { label: "Total Customers", value: "482" },
            { label: "New This Month", value: "36" },
            { label: "Retention", value: "78%" },
        ],
    };
}
