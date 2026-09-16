import { Search } from "lucide-react";
import { getGroomingBoardData } from "@/app/features/grooming/application/getGrooming";
import GroomingBoard from "@/app/features/grooming/components/GroomingBoard";
import GroomingDetails from "@/app/features/grooming/components/GroomingDetails";
import GroomingForm from "@/app/features/grooming/components/GroomingForm";

/**
 * Composes the grooming service board from feature components and workflow data.
 */
export default async function Grooming() {
    const { groomerLoad, groomingJobs, stageSummary } = await getGroomingBoardData();

    return (
        <section className="groomingView">
            <div className="groomingHeader">
                <div>
                    <p className="sectionEyebrow">Grooming</p>
                    <h2>Service Board</h2>
                </div>

                <GroomingForm />
            </div>

            <section className="groomingStageGrid" aria-label="Grooming stage summary">
                {stageSummary.map((stage) => (
                    <article key={stage.label}>
                        <strong>{stage.value}</strong>
                        <span>{stage.label}</span>
                    </article>
                ))}
            </section>

            <div className="groomingWorkspace">
                <article className="groomingPanel groomingBoardPanel">
                    <div className="groomingToolbar">
                        <label className="groomingSearch">
                            <Search size={17} />
                            <input placeholder="Search pet, groomer, or service" />
                        </label>

                        <div className="groomingActions">
                            <button>Active</button>
                            <button>By due time</button>
                        </div>
                    </div>

                    <GroomingBoard groomingJobs={groomingJobs} />
                </article>

                <GroomingDetails groomerLoad={groomerLoad} />
            </div>
        </section>
    );
}
