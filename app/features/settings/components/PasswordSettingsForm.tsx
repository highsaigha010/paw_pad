"use client";

import { FormEvent, useState } from "react";
import { changeSettingsPassword } from "@/app/features/settings/application/settingsActions";

type PasswordSettingsFormProps = {
    userId: string;
};

// Defines default values for the change password form.
const initialFormState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

/**
 * Displays password change fields for the signed-in staff user.
 */
export default function PasswordSettingsForm({ userId }: PasswordSettingsFormProps) {
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    /**
     * Submits password updates through the settings application workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const result = await changeSettingsPassword({ userId, ...formData });
        setMessage(result.message);
        setIsError(!result.ok);

        if (result.ok) {
            setFormData(initialFormState);
        }
    }

    return (
        <form className="settingsPanel settingsForm" onSubmit={handleSubmit}>
            <div>
                <p className="sectionEyebrow">Security</p>
                <h3>Change Password</h3>
            </div>

            <label>
                Current Password
                <input
                    onChange={(event) => setFormData({ ...formData, currentPassword: event.target.value })}
                    type="password"
                    value={formData.currentPassword}
                />
            </label>

            <label>
                New Password
                <input
                    onChange={(event) => setFormData({ ...formData, newPassword: event.target.value })}
                    type="password"
                    value={formData.newPassword}
                />
            </label>

            <label>
                Confirm Password
                <input
                    onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                    type="password"
                    value={formData.confirmPassword}
                />
            </label>

            {message ? <p className={isError ? "formError" : "formSuccess"}>{message}</p> : null}

            <button type="submit">Update Password</button>
        </form>
    );
}
