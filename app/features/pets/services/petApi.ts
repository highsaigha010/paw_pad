import type { CreatePetInput, Pet } from "@/app/features/pets/domain/pet";

// Temporary pet data that stands in for records returned by the backend API.
const pets: Pet[] = [
    {
        id: "pet-1001",
        name: "Mochi",
        breed: "Pomeranian",
        age: "3 yrs",
        ownerId: "customer-1001",
        owner: "Alyssa Santos",
        careNote: "Sensitive skin",
        vaccine: "Current",
        nextVisit: "Sep 04",
    },
    {
        id: "pet-1002",
        name: "Bella",
        breed: "Shih Tzu",
        age: "5 yrs",
        ownerId: "customer-1002",
        owner: "Marco Reyes",
        careNote: "Use hypo shampoo",
        vaccine: "Current",
        nextVisit: "Sep 08",
    },
    {
        id: "pet-1003",
        name: "Rocky",
        breed: "Beagle",
        age: "2 yrs",
        ownerId: "customer-1003",
        owner: "Dana Cruz",
        careNote: "Nail trim only",
        vaccine: "Review",
        nextVisit: "Sep 12",
    },
    {
        id: "pet-1004",
        name: "Luna",
        breed: "Golden Retriever",
        age: "4 yrs",
        ownerId: "customer-1004",
        owner: "Kai Lim",
        careNote: "De-shed package",
        vaccine: "Current",
        nextVisit: "Sep 15",
    },
];

/**
 * Loads pets from the backend API.
 */
export async function fetchPets() {
    return pets;
}

/**
 * Sends a create pet request to the backend API.
 */
export async function postPet(input: CreatePetInput): Promise<Pet> {
    return {
        ...input,
        id: "pet-draft",
        vaccine: "Review",
        nextVisit: "Not scheduled",
    };
}
