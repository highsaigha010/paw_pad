import { fetchGroomerLoad, fetchGroomingJobs } from "@/app/features/grooming/services/groomingApi";

/**
 * Prepares the grooming service board data needed by the presentation layer.
 */
export async function getGroomingBoardData() {
    const [groomingJobs, groomerLoad] = await Promise.all([
        fetchGroomingJobs(),
        fetchGroomerLoad(),
    ]);

    return {
        groomingJobs,
        groomerLoad,
        stageSummary: [
            { label: "Prep", value: "2" },
            { label: "Bathing", value: "3" },
            { label: "Styling", value: "2" },
            { label: "Ready", value: "4" },
        ],
    };
}
