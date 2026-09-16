// Lists vaccine states supported by the pet registry.
export type VaccineStatus = "Current" | "Review";

// Represents one pet record shown in the pet registry.
export type Pet = {
    id: string;
    name: string;
    breed: string;
    age: string;
    ownerId: string;
    owner: string;
    careNote: string;
    vaccine: VaccineStatus;
    nextVisit: string;
};

// Represents a selectable customer owner in the add pet form.
export type PetOwnerOption = {
    id: string;
    name: string;
    email: string;
};

// Represents the data required to create a pet profile.
export type CreatePetInput = {
    name: string;
    breed: string;
    age: string;
    ownerId: string;
    owner: string;
    careNote: string;
};
