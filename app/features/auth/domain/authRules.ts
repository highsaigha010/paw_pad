import type { LoginInput, SignUpInput } from "@/app/features/auth/domain/auth";

/**
 * Checks whether an email has the basic shape required for authentication.
 */
export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Checks whether a password meets the minimum local authentication policy.
 */
export function isStrongEnoughPassword(password: string) {
    return password.length >= 8;
}

/**
 * Validates login credentials before the application calls the auth service.
 */
export function validateLoginInput(input: LoginInput) {
    return Boolean(isValidEmail(input.email) && input.password);
}

/**
 * Validates signup data before the application creates an account.
 */
export function validateSignUpInput(input: SignUpInput) {
    return Boolean(
        input.name &&
        isValidEmail(input.email) &&
        isStrongEnoughPassword(input.password) &&
        input.password === input.confirmPassword,
    );
}
