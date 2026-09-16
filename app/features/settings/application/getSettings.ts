import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthSession } from "@/app/features/auth/domain/auth";
import { fetchSettingsUser } from "@/app/features/settings/services/settingsApi";

const sessionCookieName = "paw_pad_session";

/**
 * Reads the signed-in user session from the HTTP-only cookie.
 */
export async function getCurrentSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(sessionCookieName);

    if (!sessionCookie?.value) {
        return null;
    }

    try {
        return JSON.parse(Buffer.from(sessionCookie.value, "base64url").toString("utf8")) as AuthSession;
    } catch {
        return null;
    }
}

/**
 * Prepares settings page data for the signed-in staff user.
 */
export async function getSettingsData() {
    const session = await getCurrentSession();

    if (!session) {
        redirect("/login");
    }

    const user = await fetchSettingsUser(session.userId);

    if (!user) {
        redirect("/login");
    }

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}
