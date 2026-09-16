"use client";

import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { createCustomer } from "@/app/features/customers/application/createCustomer";
import type { Customer } from "@/app/features/customers/domain/customer";

// Defines default values for the add customer form.
const initialFormState = {
    name: "",
    phone: "",
    email: "",
    pets: "",
};

/**
 * Displays the add customer action and modal form.
 */
export default function CustomerForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [createdCustomer, setCreatedCustomer] = useState<Customer | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Submits customer data through the customer application workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const customer = await createCustomer(formData);
            setCreatedCustomer(customer);
            setFormData(initialFormState);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Customer could not be created.");
        }
    }

    return (
        <>
            <button className="primaryAction" onClick={() => setIsOpen(true)} type="button">
                <Plus size={18} />
                <span>Add Customer</span>
            </button>

            {isOpen ? (
                <div className="bookingModalBackdrop" role="presentation">
                    <section className="bookingModal" aria-labelledby="add-customer-title">
                        <div className="bookingModalHeader">
                            <div>
                                <p className="sectionEyebrow">Create</p>
                                <h3 id="add-customer-title">New Customer</h3>
                            </div>
                            <button aria-label="Close add customer form" onClick={() => setIsOpen(false)} type="button">
                                <X size={18} />
                            </button>
                        </div>

                        <form className="bookingFormGrid" onSubmit={handleSubmit}>
                            <label>
                                Name
                                <input
                                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                    placeholder="Customer name"
                                    value={formData.name}
                                />
                            </label>

                            <label>
                                Phone
                                <input
                                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                                    placeholder="Phone number"
                                    value={formData.phone}
                                />
                            </label>

                            <label>
                                Email
                                <input
                                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                    placeholder="Email address"
                                    type="email"
                                    value={formData.email}
                                />
                            </label>

                            <label>
                                Pets
                                <input
                                    onChange={(event) => setFormData({ ...formData, pets: event.target.value })}
                                    placeholder="Pet names"
                                    value={formData.pets}
                                />
                            </label>

                            {errorMessage ? <p className="formError">{errorMessage}</p> : null}
                            {createdCustomer ? (
                                <p className="formSuccess">
                                    Created customer profile for {createdCustomer.name}.
                                </p>
                            ) : null}

                            <div className="bookingFormActions">
                                <button onClick={() => setIsOpen(false)} type="button">
                                    Cancel
                                </button>
                                <button type="submit">Save Customer</button>
                            </div>
                        </form>
                    </section>
                </div>
            ) : null}
        </>
    );
}
