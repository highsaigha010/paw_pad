import type { CreateGroomingJobInput } from "@/app/features/grooming/domain/grooming";
import { validateCreateGroomingJobInput } from "@/app/features/grooming/domain/groomingRules";
import { postGroomingJob } from "@/app/features/grooming/services/groomingApi";

/**
 * Coordinates the create grooming service workflow.
 */
export async function createGroomingJob(input: CreateGroomingJobInput) {
    if (!validateCreateGroomingJobInput(input)) {
        throw new Error("Service cannot be created because pet, owner, service, groomer, and bay are required.");
    }

    return postGroomingJob(input);
}
