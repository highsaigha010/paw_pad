import { hashPassword, verifyPassword } from "@/app/features/auth/services/authApi";
import type { ChangePasswordInput, UpdateProfileInput } from "@/app/features/settings/domain/settings";
import { getDatabasePool } from "@/app/services/database";

type SettingsUserRow = {
    id: string;
    name: string;
    email: string;
    role: string;
    password_hash: string | null;
};

/**
 * Loads the current staff account from PostgreSQL.
 */
export async function fetchSettingsUser(userId: string) {
    const result = await getDatabasePool().query<SettingsUserRow>(
        `
            SELECT id, name, email, role, password_hash
            FROM users
            WHERE id = $1
            LIMIT 1
        `,
        [userId],
    );

    return result.rows[0] ?? null;
}

/**
 * Updates editable profile fields for the signed-in staff account.
 */
export async function updateProfile(input: UpdateProfileInput) {
    const result = await getDatabasePool().query<SettingsUserRow>(
        `
            UPDATE users
            SET name = $2, email = $3
            WHERE id = $1
            RETURNING id, name, email, role, password_hash
        `,
        [input.userId, input.name, input.email],
    );

    return result.rows[0] ?? null;
}

/**
 * Changes the signed-in staff user's password after verifying the current password.
 */
export async function updatePassword(input: ChangePasswordInput) {
    const user = await fetchSettingsUser(input.userId);

    if (!user?.password_hash || !verifyPassword(input.currentPassword, user.password_hash)) {
        return false;
    }

    await getDatabasePool().query(
        `
            UPDATE users
            SET password_hash = $2
            WHERE id = $1
        `,
        [input.userId, hashPassword(input.newPassword)],
    );

    return true;
}
