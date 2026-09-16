"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";
import { login } from "@/app/features/auth/application/authActions";

// Defines default values for the login form.
const initialFormState = {
    email: "",
    password: "",
};

/**
 * Displays the staff login form.
 */
export default function LoginForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Submits login credentials through the authentication workflow.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        const result = await login(formData);

        if (result && !result.ok) {
            setErrorMessage(result.message);
            setIsSubmitting(false);
        }
    }

    return (
        <form className="authCard" onSubmit={handleSubmit}>
            <div className="authBrand">
                <span>
                    <LogIn size={20} />
                </span>
                <div>
                    <p className="sectionEyebrow">The Paw Pad</p>
                    <h1>Staff Login</h1>
                </div>
            </div>

            <label>
                Email
                <input
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    placeholder="admin@pawpad.local"
                    type="email"
                    value={formData.email}
                />
            </label>

            <label>
                Password
                <input
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                />
            </label>

            {errorMessage ? <p className="formError">{errorMessage}</p> : null}

            <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <p className="authSwitch">
                Need an account? <Link href="/signup">Create one</Link>
            </p>
        </form>
    );
}
