"use client";

import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { createPet } from "@/app/features/pets/application/createPet";
import type { Pet, PetOwnerOption } from "@/app/features/pets/domain/pet";

// Defines default values for the add pet form.
const initialFormState = {
    name: "",
    breed: "",
    age: "",
    ownerId: "",
    owner: "",
    careNote: "",
};

type PetFormProps = {
    ownerOptions: PetOwnerOption[];
};

/**
 * Displays the add pet action and modal form.
 */
export default function PetForm({ ownerOptions }: PetFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [createdPet, setCreatedPet] = useState<Pet | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Submits pet data through the pet application workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const pet = await createPet(formData);
            setCreatedPet(pet);
            setFormData(initialFormState);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Pet could not be created.");
        }
    }

    /**
     * Stores the selected customer as the pet owner.
     */
    function handleOwnerChange(ownerId: string) {
        const owner = ownerOptions.find((option) => option.id === ownerId);

        setFormData({
            ...formData,
            ownerId,
            owner: owner?.name ?? "",
        });
    }

    return (
        <>
            <button className="primaryAction" onClick={() => setIsOpen(true)} type="button">
                <Plus size={18} />
                <span>Add Pet</span>
            </button>

            {isOpen ? (
                <div className="bookingModalBackdrop" role="presentation">
                    <section className="bookingModal" aria-labelledby="add-pet-title">
                        <div className="bookingModalHeader">
                            <div>
                                <p className="sectionEyebrow">Create</p>
                                <h3 id="add-pet-title">New Pet</h3>
                            </div>
                            <button aria-label="Close add pet form" onClick={() => setIsOpen(false)} type="button">
                                <X size={18} />
                            </button>
                        </div>

                        <form className="bookingFormGrid" onSubmit={handleSubmit}>
                            <label>
                                Name
                                <input onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Pet name" value={formData.name} />
                            </label>
                            <label>
                                Breed
                                <input onChange={(event) => setFormData({ ...formData, breed: event.target.value })} placeholder="Breed" value={formData.breed} />
                            </label>
                            <label>
                                Age
                                <input onChange={(event) => setFormData({ ...formData, age: event.target.value })} placeholder="Age" value={formData.age} />
                            </label>
                            <label>
                                Owner
                                <select onChange={(event) => handleOwnerChange(event.target.value)} value={formData.ownerId}>
                                    <option value="">Select customer</option>
                                    {ownerOptions.map((owner) => (
                                        <option key={owner.id} value={owner.id}>
                                            {owner.name} ({owner.email})
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Care Note
                                <input onChange={(event) => setFormData({ ...formData, careNote: event.target.value })} placeholder="Care preference" value={formData.careNote} />
                            </label>

                            {errorMessage ? <p className="formError">{errorMessage}</p> : null}
                            {createdPet ? <p className="formSuccess">Created pet profile for {createdPet.name}.</p> : null}

                            <div className="bookingFormActions">
                                <button onClick={() => setIsOpen(false)} type="button">Cancel</button>
                                <button type="submit">Save Pet</button>
                            </div>
                        </form>
                    </section>
                </div>
            ) : null}
        </>
    );
}
