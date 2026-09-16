import { ShieldCheck } from "lucide-react";
import type { CustomerTask } from "@/app/features/customers/domain/customer";

type CustomerDetailsProps = {
    customerTasks: CustomerTask[];
};

/**
 * Displays customer side details and follow-up tasks.
 */
export default function CustomerDetails({ customerTasks }: CustomerDetailsProps) {
    return (
        <aside className="customersSideRail">
            <article className="customersPanel profileQualityPanel">
                <div className="sidePanelTitle">
                    <div>
                        <p className="sectionEyebrow">Data Quality</p>
                        <h3>Profiles</h3>
                    </div>
                    <ShieldCheck size={19} />
                </div>
                <div className="qualityMeter" aria-hidden="true">
                    <span />
                </div>
                <strong>91% complete</strong>
            </article>

            <article className="customersPanel customerTasksPanel">
                <p className="sectionEyebrow">Follow Up</p>
                <h3>Tasks</h3>
                {customerTasks.map((task) => (
                    <div className="customerTask" key={task.id}>
                        {task.title}
                    </div>
                ))}
            </article>
        </aside>
    );
}
