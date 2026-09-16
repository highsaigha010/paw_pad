"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthSession, LoginInput, SignUpInput } from "@/app/features/auth/domain/auth";
import { validateLoginInput, validateSignUpInput } from "@/app/features/auth/domain/authRules";
import { authenticateUser, createAuthSession, createAuthUser } from "@/app/features/auth/services/authApi";

const sessionCookieName = "paw_pad_session";

/**
 * Stores the authenticated user session in an HTTP-only cookie.
 */
async function setSessionCookie(session: AuthSession) {
    const cookieStore = await cookies();

    cookieStore.set({
        name: sessionCookieName,
        value: Buffer.from(JSON.stringify(session)).toString("base64url"),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
    });
}

/**
 * Coordinates the login workflow.
 */
export async function login(input: LoginInput) {
    if (!validateLoginInput(input)) {
        return { ok: false, message: "Enter a valid email and password." };
    }

    const session = await authenticateUser(input);

    if (!session) {
        return { ok: false, message: "Invalid email or password." };
    }

    await setSessionCookie(session);
    redirect("/");
}

/**
 * Coordinates the signup workflow.
 */
export async function signUp(input: SignUpInput) {
    if (!validateSignUpInput(input)) {
        return { ok: false, message: "Use a valid email and matching password with at least 8 characters." };
    }

    const user = await createAuthUser(input);
    await setSessionCookie(createAuthSession(user));
    redirect("/");
}

/**
 * Deletes the current auth session cookie.
 */
export async function logout() {
    const cookieStore = await cookies();

    cookieStore.delete(sessionCookieName);
    redirect("/login");
}
