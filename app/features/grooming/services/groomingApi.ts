import type { CreateGroomingJobInput, GroomerLoad, GroomingJob } from "@/app/features/grooming/domain/grooming";

// Temporary grooming jobs that stand in for backend records.
const groomingJobs: GroomingJob[] = [
    { id: "grooming-1001", pet: "Mochi", owner: "Alyssa Santos", service: "Full Groom", groomer: "Jenna", bay: "Bay 2", stage: "Styling", due: "10:45" },
    { id: "grooming-1002", pet: "Bella", owner: "Marco Reyes", service: "Bath & Brush", groomer: "Carlo", bay: "Bay 1", stage: "Bathing", due: "11:20" },
    { id: "grooming-1003", pet: "Luna", owner: "Kai Lim", service: "De-shed Treatment", groomer: "Jenna", bay: "Bay 4", stage: "Prep", due: "15:15" },
    { id: "grooming-1004", pet: "Rocky", owner: "Dana Cruz", service: "Nail Trim", groomer: "Mia", bay: "Station 1", stage: "Ready", due: "13:35" },
];

// Temporary groomer load data that stands in for backend records.
const groomerLoad: GroomerLoad[] = [
    { id: "groomer-1", name: "Jenna", jobs: "4", utilization: "80%" },
    { id: "groomer-2", name: "Carlo", jobs: "3", utilization: "60%" },
    { id: "groomer-3", name: "Mia", jobs: "2", utilization: "40%" },
];

/**
 * Loads active grooming jobs from the backend API.
 */
export async function fetchGroomingJobs() {
    return groomingJobs;
}

/**
 * Loads groomer workload from the backend API.
 */
export async function fetchGroomerLoad() {
    return groomerLoad;
}

/**
 * Sends a create grooming job request to the backend API.
 */
export async function postGroomingJob(input: CreateGroomingJobInput): Promise<GroomingJob> {
    return {
        ...input,
        id: "grooming-draft",
        stage: "Prep",
    };
}
