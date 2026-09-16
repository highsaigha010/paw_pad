"use client";

import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { createBooking } from "@/app/features/bookings/application/createBooking";
import type { Booking, BookingOwnerOption, BookingPetOption } from "@/app/features/bookings/domain/booking";

// Defines the initial form values used when staff opens the create booking form.
const initialFormState = {
    date: "2026-08-31",
    time: "11:30",
    customerId: "",
    petId: "",
    pet: "",
    owner: "",
    service: "Full Groom",
    serviceDurationMinutes: 90,
    groomer: "Jenna",
    price: "$85",
};

type BookingFormProps = {
    ownerOptions: BookingOwnerOption[];
    petOptions: BookingPetOption[];
};

/**
 * Displays the create booking action and modal form.
 */
export default function BookingForm({ ownerOptions, petOptions }: BookingFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Submits the form through the booking application workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const booking = await createBooking(formData);
            setCreatedBooking(booking);
            setFormData(initialFormState);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Booking could not be created.");
        }
    }

    const filteredPetOptions = petOptions.filter((pet) => pet.ownerId === formData.customerId);

    /**
     * Stores the selected customer and clears the selected pet when the owner changes.
     */
    function handleOwnerChange(customerId: string) {
        const owner = ownerOptions.find((option) => option.id === customerId);

        setFormData({
            ...formData,
            customerId,
            owner: owner?.name ?? "",
            petId: "",
            pet: "",
        });
    }

    /**
     * Stores the selected pet under the currently selected customer.
     */
    function handlePetChange(petId: string) {
        const pet = filteredPetOptions.find((option) => option.id === petId);

        setFormData({
            ...formData,
            petId,
            pet: pet?.name ?? "",
        });
    }

    return (
        <>
            <button className="primaryAction" onClick={() => setIsOpen(true)} type="button">
                <Plus size={18} />
                <span>Create Booking</span>
            </button>

            {isOpen ? (
                <div className="bookingModalBackdrop" role="presentation">
                    <section className="bookingModal" aria-labelledby="create-booking-title">
                        <div className="bookingModalHeader">
                            <div>
                                <p className="sectionEyebrow">Create</p>
                                <h3 id="create-booking-title">New Booking</h3>
                            </div>
                            <button aria-label="Close create booking form" onClick={() => setIsOpen(false)} type="button">
                                <X size={18} />
                            </button>
                        </div>

                        <form className="bookingFormGrid" onSubmit={handleSubmit}>
                            <label>
                                Date
                                <input
                                    onChange={(event) => setFormData({ ...formData, date: event.target.value })}
                                    type="date"
                                    value={formData.date}
                                />
                            </label>

                            <label>
                                Time
                                <input
                                    onChange={(event) => setFormData({ ...formData, time: event.target.value })}
                                    type="time"
                                    value={formData.time}
                                />
                            </label>

                            <label>
                                Owner
                                <select onChange={(event) => handleOwnerChange(event.target.value)} value={formData.customerId}>
                                    <option value="">Select customer</option>
                                    {ownerOptions.map((owner) => (
                                        <option key={owner.id} value={owner.id}>
                                            {owner.name} ({owner.email})
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Pet
                                <select
                                    disabled={!formData.customerId}
                                    onChange={(event) => handlePetChange(event.target.value)}
                                    value={formData.petId}
                                >
                                    <option value="">
                                        {formData.customerId ? "Select pet" : "Select owner first"}
                                    </option>
                                    {filteredPetOptions.map((pet) => (
                                        <option key={pet.id} value={pet.id}>
                                            {pet.name} ({pet.breed})
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Service
                                <select
                                    onChange={(event) => setFormData({ ...formData, service: event.target.value })}
                                    value={formData.service}
                                >
                                    <option>Full Groom</option>
                                    <option>Bath & Brush</option>
                                    <option>Nail Trim</option>
                                    <option>De-shed Treatment</option>
                                </select>
                            </label>

                            <label>
                                Groomer
                                <select
                                    onChange={(event) => setFormData({ ...formData, groomer: event.target.value })}
                                    value={formData.groomer}
                                >
                                    <option>Jenna</option>
                                    <option>Carlo</option>
                                    <option>Mia</option>
                                </select>
                            </label>

                            {errorMessage ? <p className="formError">{errorMessage}</p> : null}
                            {createdBooking ? (
                                <p className="formSuccess">
                                    Created {createdBooking.pet} for {createdBooking.time}.
                                </p>
                            ) : null}

                            <div className="bookingFormActions">
                                <button onClick={() => setIsOpen(false)} type="button">
                                    Cancel
                                </button>
                                <button type="submit">Save Booking</button>
                            </div>
                        </form>
                    </section>
                </div>
            ) : null}
        </>
    );
}
