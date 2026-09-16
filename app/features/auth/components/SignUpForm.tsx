"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { UserPlus } from "lucide-react";
import { signUp } from "@/app/features/auth/application/authActions";

// Defines default values for the signup form.
const initialFormState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

/**
 * Displays the staff signup form.
 */
export default function SignUpForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Submits signup data through the authentication workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        const result = await signUp(formData);

        if (result && !result.ok) {
            setErrorMessage(result.message);
            setIsSubmitting(false);
        }
    }

    return (
        <form className="authCard" onSubmit={handleSubmit}>
            <div className="authBrand">
                <span>
                    <UserPlus size={20} />
                </span>
                <div>
                    <p className="sectionEyebrow">The Paw Pad</p>
                    <h1>Create Account</h1>
                </div>
            </div>

            <label>
                Name
                <input
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    placeholder="Staff name"
                    value={formData.name}
                />
            </label>

            <label>
                Email
                <input
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    placeholder="email@pawpad.local"
                    type="email"
                    value={formData.email}
                />
            </label>

            <label>
                Password
                <input
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                    placeholder="At least 8 characters"
                    type="password"
                    value={formData.password}
                />
            </label>

            <label>
                Confirm Password
                <input
                    onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                    placeholder="Confirm password"
                    type="password"
                    value={formData.confirmPassword}
                />
            </label>

            {errorMessage ? <p className="formError">{errorMessage}</p> : null}

            <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Creating..." : "Create Account"}
            </button>

            <p className="authSwitch">
                Already have an account? <Link href="/login">Sign in</Link>
            </p>
        </form>
    );
}
