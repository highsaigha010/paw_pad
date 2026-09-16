import { CheckCircle2, Clock, Scissors, TimerReset } from "lucide-react";
import type { GroomerLoad } from "@/app/features/grooming/domain/grooming";

type GroomingDetailsProps = {
    groomerLoad: GroomerLoad[];
};

/**
 * Displays grooming floor capacity, team load, and operational signals.
 */
export default function GroomingDetails({ groomerLoad }: GroomingDetailsProps) {
    return (
        <aside className="groomingSideRail">
            <article className="groomingPanel groomingCapacityPanel">
                <div className="sidePanelTitle">
                    <div>
                        <p className="sectionEyebrow">Capacity</p>
                        <h3>Floor Status</h3>
                    </div>
                    <Scissors size={19} />
                </div>
                <div className="qualityMeter" aria-hidden="true">
                    <span />
                </div>
                <strong>4 of 6 stations active</strong>
            </article>

            <article className="groomingPanel groomerLoadPanel">
                <p className="sectionEyebrow">Team</p>
                <h3>Groomer Load</h3>
                {groomerLoad.map((groomer) => (
                    <div className="groomerLoadItem" key={groomer.id}>
                        <div>
                            <strong>{groomer.name}</strong>
                            <span>{groomer.jobs} jobs</span>
                        </div>
                        <mark>{groomer.utilization}</mark>
                    </div>
                ))}
            </article>

            <article className="groomingPanel groomingSignalsPanel">
                <div>
                    <Clock size={18} />
                    <strong>2 services near due time</strong>
                </div>
                <div>
                    <TimerReset size={18} />
                    <strong>Average service time: 74 min</strong>
                </div>
                <div>
                    <CheckCircle2 size={18} />
                    <strong>6 completed today</strong>
                </div>
            </article>
        </aside>
    );
}
