import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import type { AuthSession, LoginInput, SignUpInput } from "@/app/features/auth/domain/auth";
import { getDatabasePool } from "@/app/services/database";

type AuthUserRow = {
    id: string;
    name: string;
    email: string;
    role: string;
    password_hash: string | null;
};

const passwordIterations = 120000;
const passwordKeyLength = 64;
const passwordDigest = "sha512";

/**
 * Hashes a password before it is stored in the database.
 */
export function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(password, salt, passwordIterations, passwordKeyLength, passwordDigest).toString("hex");

    return `${passwordIterations}:${salt}:${hash}`;
}

/**
 * Verifies a submitted password against a stored password hash.
 */
export function verifyPassword(password: string, storedHash: string) {
    const [iterationsValue, salt, originalHash] = storedHash.split(":");
    const iterations = Number(iterationsValue);
    const candidateHash = pbkdf2Sync(password, salt, iterations, passwordKeyLength, passwordDigest);
    const originalHashBuffer = Buffer.from(originalHash, "hex");

    return originalHashBuffer.length === candidateHash.length && timingSafeEqual(originalHashBuffer, candidateHash);
}

/**
 * Finds an authenticated user by email address.
 */
export async function findAuthUserByEmail(email: string) {
    const result = await getDatabasePool().query<AuthUserRow>(
        `
            SELECT id, name, email, role, password_hash
            FROM users
            WHERE lower(email) = lower($1)
            LIMIT 1
        `,
        [email],
    );

    return result.rows[0] ?? null;
}

/**
 * Creates a staff account in PostgreSQL during signup.
 */
export async function createAuthUser(input: SignUpInput) {
    const passwordHash = hashPassword(input.password);
    const id = `user-${Date.now()}`;

    const result = await getDatabasePool().query<AuthUserRow>(
        `
            INSERT INTO users (id, name, email, role, status, last_active, password_hash)
            VALUES ($1, $2, $3, 'Front Desk', 'Active', 'Today', $4)
            RETURNING id, name, email, role, password_hash
        `,
        [id, input.name, input.email, passwordHash],
    );

    return result.rows[0];
}

/**
 * Converts a database user row into the session payload.
 */
export function createAuthSession(user: AuthUserRow): AuthSession {
    return {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

/**
 * Authenticates a user by email and password.
 */
export async function authenticateUser(input: LoginInput) {
    const user = await findAuthUserByEmail(input.email);

    if (!user?.password_hash || !verifyPassword(input.password, user.password_hash)) {
        return null;
    }

    return createAuthSession(user);
}
