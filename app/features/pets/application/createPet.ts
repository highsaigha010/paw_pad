import type { CreatePetInput } from "@/app/features/pets/domain/pet";
import { validateCreatePetInput } from "@/app/features/pets/domain/petRules";
import { postPet } from "@/app/features/pets/services/petApi";

/**
 * Coordinates the create pet workflow.
 */
export async function createPet(input: CreatePetInput) {
    if (!validateCreatePetInput(input)) {
        throw new Error("Pet cannot be created because name, breed, and owner are required.");
    }

    return postPet(input);
}
