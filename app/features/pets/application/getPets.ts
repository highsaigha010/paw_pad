import { fetchCustomers } from "@/app/features/customers/services/customerApi";
import { fetchPets } from "@/app/features/pets/services/petApi";

/**
 * Prepares the pet registry data needed by the presentation layer.
 */
export async function getPetRegistryData() {
    const [customers, pets] = await Promise.all([
        fetchCustomers(),
        fetchPets(),
    ]);

    return {
        ownerOptions: customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
        })),
        pets,
        careTags: ["Sensitive skin", "Senior care", "Anxiety support", "Hypoallergenic"],
        summary: [
            { label: "Registered Pets", value: "638" },
            { label: "Active Care Plans", value: "42" },
            { label: "Vaccine Reviews", value: "9" },
        ],
    };
}
