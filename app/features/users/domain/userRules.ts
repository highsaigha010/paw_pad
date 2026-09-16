import type { CreateUserInput, UserStatus } from "@/app/features/users/domain/user";

/**
 * Returns the CSS class suffix for a user status badge.
 */
export function getUserStatusClass(status: UserStatus) {
    return status.toLowerCase();
}

/**
 * Validates the minimum fields needed before creating a staff user.
 */
export function validateCreateUserInput(input: CreateUserInput) {
    return Boolean(input.name && input.email && input.role);
}
