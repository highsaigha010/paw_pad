"use client";

import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { createGroomingJob } from "@/app/features/grooming/application/createGroomingJob";
import type { GroomingJob } from "@/app/features/grooming/domain/grooming";

// Defines default values for the add grooming service form.
const initialFormState = {
    pet: "",
    owner: "",
    service: "Full Groom",
    groomer: "Jenna",
    bay: "Bay 1",
    due: "11:30",
};

/**
 * Displays the add service action and modal form.
 */
export default function GroomingForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [createdJob, setCreatedJob] = useState<GroomingJob | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Submits grooming service data through the grooming application workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const job = await createGroomingJob(formData);
            setCreatedJob(job);
            setFormData(initialFormState);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Service could not be created.");
        }
    }

    return (
        <>
            <button className="primaryAction" onClick={() => setIsOpen(true)} type="button">
                <Plus size={18} />
                <span>Add Service</span>
            </button>

            {isOpen ? (
                <div className="bookingModalBackdrop" role="presentation">
                    <section className="bookingModal" aria-labelledby="add-service-title">
                        <div className="bookingModalHeader">
                            <div>
                                <p className="sectionEyebrow">Create</p>
                                <h3 id="add-service-title">New Service</h3>
                            </div>
                            <button aria-label="Close add service form" onClick={() => setIsOpen(false)} type="button">
                                <X size={18} />
                            </button>
                        </div>

                        <form className="bookingFormGrid" onSubmit={handleSubmit}>
                            <label>
                                Pet
                                <input onChange={(event) => setFormData({ ...formData, pet: event.target.value })} placeholder="Pet name" value={formData.pet} />
                            </label>
                            <label>
                                Owner
                                <input onChange={(event) => setFormData({ ...formData, owner: event.target.value })} placeholder="Owner name" value={formData.owner} />
                            </label>
                            <label>
                                Service
                                <select onChange={(event) => setFormData({ ...formData, service: event.target.value })} value={formData.service}>
                                    <option>Full Groom</option>
                                    <option>Bath & Brush</option>
                                    <option>Nail Trim</option>
                                    <option>De-shed Treatment</option>
                                </select>
                            </label>
                            <label>
                                Groomer
                                <select onChange={(event) => setFormData({ ...formData, groomer: event.target.value })} value={formData.groomer}>
                                    <option>Jenna</option>
                                    <option>Carlo</option>
                                    <option>Mia</option>
                                </select>
                            </label>
                            <label>
                                Bay
                                <input onChange={(event) => setFormData({ ...formData, bay: event.target.value })} placeholder="Bay or station" value={formData.bay} />
                            </label>
                            <label>
                                Due
                                <input onChange={(event) => setFormData({ ...formData, due: event.target.value })} type="time" value={formData.due} />
                            </label>

                            {errorMessage ? <p className="formError">{errorMessage}</p> : null}
                            {createdJob ? <p className="formSuccess">Created service for {createdJob.pet}.</p> : null}

                            <div className="bookingFormActions">
                                <button onClick={() => setIsOpen(false)} type="button">Cancel</button>
                                <button type="submit">Save Service</button>
                            </div>
                        </form>
                    </section>
                </div>
            ) : null}
        </>
    );
}
