import { MoreHorizontal, PawPrint } from "lucide-react";
import type { Pet } from "@/app/features/pets/domain/pet";
import { getVaccineStatusClass } from "@/app/features/pets/domain/petRules";

type PetTableProps = {
    pets: Pet[];
};

/**
 * Displays pet records in a structured registry table.
 */
export default function PetTable({ pets }: PetTableProps) {
    return (
        <div className="petsTable">
            <div className="petsTableHead">
                <span>Pet</span>
                <span>Owner</span>
                <span>Care Note</span>
                <span>Vaccine</span>
                <span>Next Visit</span>
                <span />
            </div>

            {pets.map((pet) => (
                <div className="petRow" key={pet.id}>
                    <div className="petIdentity">
                        <span>
                            <PawPrint size={17} />
                        </span>
                        <div>
                            <strong>{pet.name}</strong>
                            <p>{pet.breed} · {pet.age}</p>
                        </div>
                    </div>
                    <span>{pet.owner}</span>
                    <span>{pet.careNote}</span>
                    <mark className={`petStatus ${getVaccineStatusClass(pet.vaccine)}`}>{pet.vaccine}</mark>
                    <time>{pet.nextVisit}</time>
                    <button aria-label={`Open actions for ${pet.name}`}>
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}
