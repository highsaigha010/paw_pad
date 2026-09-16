import { MoreHorizontal } from "lucide-react";
import type { GroomingJob } from "@/app/features/grooming/domain/grooming";
import { getGroomingStageClass } from "@/app/features/grooming/domain/groomingRules";

type GroomingBoardProps = {
    groomingJobs: GroomingJob[];
};

/**
 * Displays active grooming jobs in a service board table.
 */
export default function GroomingBoard({ groomingJobs }: GroomingBoardProps) {
    return (
        <div className="groomingTable">
            <div className="groomingTableHead">
                <span>Pet</span>
                <span>Service</span>
                <span>Groomer</span>
                <span>Bay</span>
                <span>Stage</span>
                <span>Due</span>
                <span />
            </div>

            {groomingJobs.map((job) => (
                <div className="groomingRow" key={job.id}>
                    <div>
                        <strong>{job.pet}</strong>
                        <p>{job.owner}</p>
                    </div>
                    <span>{job.service}</span>
                    <span>{job.groomer}</span>
                    <span>{job.bay}</span>
                    <mark className={`groomingStage ${getGroomingStageClass(job.stage)}`}>{job.stage}</mark>
                    <time>{job.due}</time>
                    <button aria-label={`Open actions for ${job.pet}`}>
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}
