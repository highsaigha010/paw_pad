import type { CreateGroomingJobInput, GroomingStage } from "@/app/features/grooming/domain/grooming";

/**
 * Returns the CSS class suffix for a grooming stage badge.
 */
export function getGroomingStageClass(stage: GroomingStage) {
    return stage.toLowerCase();
}

/**
 * Validates the minimum fields needed before creating a grooming job.
 */
export function validateCreateGroomingJobInput(input: CreateGroomingJobInput) {
    return Boolean(input.pet && input.owner && input.service && input.groomer && input.bay);
}
