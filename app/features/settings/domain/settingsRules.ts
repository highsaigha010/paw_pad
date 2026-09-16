import { isStrongEnoughPassword, isValidEmail } from "@/app/features/auth/domain/authRules";
import type { ChangePasswordInput, UpdateProfileInput } from "@/app/features/settings/domain/settings";

/**
 * Validates profile details before updating a staff account.
 */
export function validateUpdateProfileInput(input: UpdateProfileInput) {
    return Boolean(input.userId && input.name && isValidEmail(input.email));
}

/**
 * Validates password change input before checking the stored password.
 */
export function validateChangePasswordInput(input: ChangePasswordInput) {
    return Boolean(
        input.userId &&
        input.currentPassword &&
        isStrongEnoughPassword(input.newPassword) &&
        input.newPassword === input.confirmPassword,
    );
}
