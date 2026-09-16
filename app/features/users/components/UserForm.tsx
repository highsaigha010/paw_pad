"use client";

import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { createUser } from "@/app/features/users/application/createUser";
import type { User, UserRole } from "@/app/features/users/domain/user";

// Defines default values for the add user form.
const initialFormState = {
    name: "",
    email: "",
    role: "Front Desk" as UserRole,
};

/**
 * Displays the add user action and modal form.
 */
export default function UserForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [createdUser, setCreatedUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Submits staff user data through the user application workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const user = await createUser(formData);
            setCreatedUser(user);
            setFormData(initialFormState);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "User could not be created.");
        }
    }

    return (
        <>
            <button className="primaryAction" onClick={() => setIsOpen(true)} type="button">
                <Plus size={18} />
                <span>Add User</span>
            </button>

            {isOpen ? (
                <div className="bookingModalBackdrop" role="presentation">
                    <section className="bookingModal" aria-labelledby="add-user-title">
                        <div className="bookingModalHeader">
                            <div>
                                <p className="sectionEyebrow">Create</p>
                                <h3 id="add-user-title">New User</h3>
                            </div>
                            <button aria-label="Close add user form" onClick={() => setIsOpen(false)} type="button">
                                <X size={18} />
                            </button>
                        </div>

                        <form className="bookingFormGrid" onSubmit={handleSubmit}>
                            <label>
                                Name
                                <input onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Staff name" value={formData.name} />
                            </label>
                            <label>
                                Email
                                <input onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="Email address" type="email" value={formData.email} />
                            </label>
                            <label>
                                Role
                                <select onChange={(event) => setFormData({ ...formData, role: event.target.value as UserRole })} value={formData.role}>
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>Groomer</option>
                                    <option>Front Desk</option>
                                </select>
                            </label>

                            {errorMessage ? <p className="formError">{errorMessage}</p> : null}
                            {createdUser ? <p className="formSuccess">Created invite for {createdUser.name}.</p> : null}

                            <div className="bookingFormActions">
                                <button onClick={() => setIsOpen(false)} type="button">Cancel</button>
                                <button type="submit">Save User</button>
                            </div>
                        </form>
                    </section>
                </div>
            ) : null}
        </>
    );
}
