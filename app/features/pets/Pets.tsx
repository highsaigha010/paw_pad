import { Search } from "lucide-react";
import { getPetRegistryData } from "@/app/features/pets/application/getPets";
import PetDetails from "@/app/features/pets/components/PetDetails";
import PetForm from "@/app/features/pets/components/PetForm";
import PetTable from "@/app/features/pets/components/PetTable";

/**
 * Composes the pet registry screen from feature components and workflow data.
 */
export default async function Pets() {
    const { careTags, ownerOptions, pets, summary } = await getPetRegistryData();

    return (
        <section className="petsView">
            <div className="petsHeader">
                <div>
                    <p className="sectionEyebrow">Pets</p>
                    <h2>Pet Registry</h2>
                </div>

                <PetForm ownerOptions={ownerOptions} />
            </div>

            <section className="petSummary" aria-label="Pet summary">
                {summary.map((item) => (
                    <article key={item.label}>
                        <p>{item.label}</p>
                        <strong>{item.value}</strong>
                    </article>
                ))}
            </section>

            <div className="petsWorkspace">
                <article className="petsPanel petTablePanel">
                    <div className="petsToolbar">
                        <label className="petSearch">
                            <Search size={17} />
                            <input placeholder="Search pets, breeds, or owners" />
                        </label>

                        <div className="petActions">
                            <button>All pets</button>
                            <button>Care notes</button>
                        </div>
                    </div>

                    <PetTable pets={pets} />
                </article>

                <PetDetails careTags={careTags} />
            </div>
        </section>
    );
}
