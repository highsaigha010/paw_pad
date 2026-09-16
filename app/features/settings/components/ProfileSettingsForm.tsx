"use client";

import { FormEvent, useState } from "react";
import { updateSettingsProfile } from "@/app/features/settings/application/settingsActions";

type ProfileSettingsFormProps = {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
};

/**
 * Displays editable profile fields for the signed-in staff user.
 */
export default function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
    const [formData, setFormData] = useState({
        userId: user.id,
        name: user.name,
        email: user.email,
    });
    const [message, setMessage] = useState("");

    /**
     * Submits profile updates through the settings application workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const result = await updateSettingsProfile(formData);
        setMessage(result.message);
    }

    return (
        <form className="settingsPanel settingsForm" onSubmit={handleSubmit}>
            <div>
                <p className="sectionEyebrow">Profile</p>
                <h3>Account Info</h3>
            </div>

            <label>
                Name
                <input onChange={(event) => setFormData({ ...formData, name: event.target.value })} value={formData.name} />
            </label>

            <label>
                Email
                <input onChange={(event) => setFormData({ ...formData, email: event.target.value })} type="email" value={formData.email} />
            </label>

            <label>
                Role
                <input disabled value={user.role} />
            </label>

            {message ? <p className="formSuccess">{message}</p> : null}

            <button type="submit">Save Info</button>
        </form>
    );
}
