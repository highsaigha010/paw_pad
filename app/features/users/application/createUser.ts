"use server";

import type { CreateUserInput } from "@/app/features/users/domain/user";
import { validateCreateUserInput } from "@/app/features/users/domain/userRules";
import { postUser } from "@/app/features/users/services/userApi";

/**
 * Coordinates the create staff user workflow.
 */
export async function createUser(input: CreateUserInput) {
    if (!validateCreateUserInput(input)) {
        throw new Error("User cannot be created because name, email, and role are required.");
    }

    return postUser(input);
}
