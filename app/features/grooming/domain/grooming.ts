// Lists service stages used on the grooming floor.
export type GroomingStage = "Prep" | "Bathing" | "Styling" | "Ready";

// Represents one active grooming job.
export type GroomingJob = {
    id: string;
    pet: string;
    owner: string;
    service: string;
    groomer: string;
    bay: string;
    stage: GroomingStage;
    due: string;
};

// Represents workload for one groomer.
export type GroomerLoad = {
    id: string;
    name: string;
    jobs: string;
    utilization: string;
};

// Represents the input required to create a grooming service job.
export type CreateGroomingJobInput = {
    pet: string;
    owner: string;
    service: string;
    groomer: string;
    bay: string;
    due: string;
};
