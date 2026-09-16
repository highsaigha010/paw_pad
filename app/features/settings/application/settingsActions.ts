"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AuthSession } from "@/app/features/auth/domain/auth";
import type { ChangePasswordInput, UpdateProfileInput } from "@/app/features/settings/domain/settings";
import { validateChangePasswordInput, validateUpdateProfileInput } from "@/app/features/settings/domain/settingsRules";
import { updatePassword, updateProfile } from "@/app/features/settings/services/settingsApi";

const sessionCookieName = "paw_pad_session";

/**
 * Stores updated profile details in the HTTP-only session cookie.
 */
async function refreshSessionCookie(session: AuthSession) {
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
 * Coordinates the update profile workflow.
 */
export async function updateSettingsProfile(input: UpdateProfileInput) {
    if (!validateUpdateProfileInput(input)) {
        return { ok: false, message: "Use a valid name and email address." };
    }

    const user = await updateProfile(input);

    if (!user) {
        return { ok: false, message: "Profile could not be updated." };
    }

    await refreshSessionCookie({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
    revalidatePath("/settings");

    return { ok: true, message: "Profile updated." };
}

/**
 * Coordinates the change password workflow.
 */
export async function changeSettingsPassword(input: ChangePasswordInput) {
    if (!validateChangePasswordInput(input)) {
        return { ok: false, message: "Use matching passwords with at least 8 characters." };
    }

    const changed = await updatePassword(input);

    if (!changed) {
        return { ok: false, message: "Current password is incorrect." };
    }

    return { ok: true, message: "Password changed." };
}

/**
 * Deletes the current session and redirects to login.
 */
export async function logoutFromSettings() {
    const cookieStore = await cookies();

    cookieStore.delete(sessionCookieName);
    redirect("/login");
}
