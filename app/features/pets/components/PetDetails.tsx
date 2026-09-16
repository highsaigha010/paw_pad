import { CalendarDays, HeartPulse, ShieldCheck } from "lucide-react";

type PetDetailsProps = {
    careTags: string[];
};

/**
 * Displays pet registry side details and care flags.
 */
export default function PetDetails({ careTags }: PetDetailsProps) {
    return (
        <aside className="petsSideRail">
            <article className="petsPanel careProfilePanel">
                <div className="sidePanelTitle">
                    <div>
                        <p className="sectionEyebrow">Care</p>
                        <h3>Profile Readiness</h3>
                    </div>
                    <ShieldCheck size={19} />
                </div>
                <div className="qualityMeter" aria-hidden="true">
                    <span />
                </div>
                <strong>88% complete</strong>
            </article>

            <article className="petsPanel petCareTagsPanel">
                <p className="sectionEyebrow">Tags</p>
                <h3>Care Flags</h3>
                <div className="careTagList">
                    {careTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            </article>

            <article className="petsPanel petHealthPanel">
                <div>
                    <HeartPulse size={18} />
                    <strong>9 vaccine records need review</strong>
                </div>
                <div>
                    <CalendarDays size={18} />
                    <strong>12 pets booked this week</strong>
                </div>
            </article>
        </aside>
    );
}
