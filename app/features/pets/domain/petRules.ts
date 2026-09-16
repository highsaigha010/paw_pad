import type { CreatePetInput, VaccineStatus } from "@/app/features/pets/domain/pet";

/**
 * Returns the CSS class suffix for a pet vaccine badge.
 */
export function getVaccineStatusClass(status: VaccineStatus) {
    return status.toLowerCase();
}

/**
 * Validates the minimum fields needed before creating a pet profile.
 */
export function validateCreatePetInput(input: CreatePetInput) {
    return Boolean(input.name && input.breed && input.ownerId && input.owner);
}
