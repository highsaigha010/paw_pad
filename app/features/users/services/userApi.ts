import type { CreateUserInput, User } from "@/app/features/users/domain/user";
import { getDatabasePool } from "@/app/services/database";

type UserRow = {
    id: string;
    name: string;
    email: string;
    role: User["role"];
    status: User["status"];
    last_active: string;
};

// Temporary user data used when PostgreSQL is not configured or not reachable.
const fallbackUsers: User[] = [
    { id: "user-1001", name: "Admin Desk", email: "admin@pawpad.local", role: "Admin", status: "Active", lastActive: "Today" },
    { id: "user-1002", name: "Jenna Flores", email: "jenna@pawpad.local", role: "Groomer", status: "Active", lastActive: "Today" },
    { id: "user-1003", name: "Carlo Reyes", email: "carlo@pawpad.local", role: "Groomer", status: "Invited", lastActive: "Pending" },
    { id: "user-1004", name: "Mia Tan", email: "mia@pawpad.local", role: "Front Desk", status: "Active", lastActive: "Yesterday" },
];

/**
 * Converts a database row into the user domain model used by the app.
 */
function mapUserRow(row: UserRow): User {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
        status: row.status,
        lastActive: row.last_active,
    };
}

/**
 * Loads staff users from PostgreSQL with local fallback for early development.
 */
export async function fetchUsers() {
    if (!process.env.DATABASE_URL) {
        return fallbackUsers;
    }

    try {
        const result = await getDatabasePool().query<UserRow>(`
            SELECT id, name, email, role, status, last_active
            FROM users
            ORDER BY name ASC
        `);

        return result.rows.map(mapUserRow);
    } catch (error) {
        console.error("Failed to load users from PostgreSQL.", error);
        return fallbackUsers;
    }
}

/**
 * Sends a create user request to PostgreSQL with local fallback.
 */
export async function postUser(input: CreateUserInput): Promise<User> {
    if (process.env.DATABASE_URL) {
        try {
            const id = `user-${Date.now()}`;
            const result = await getDatabasePool().query<UserRow>(
                `
                    INSERT INTO users (id, name, email, role, status, last_active)
                    VALUES ($1, $2, $3, $4, 'Invited', 'Pending')
                    RETURNING id, name, email, role, status, last_active
                `,
                [id, input.name, input.email, input.role],
            );

            return mapUserRow(result.rows[0]);
        } catch (error) {
            console.error("Failed to create user in PostgreSQL.", error);
        }
    }

    return {
        ...input,
        id: "user-draft",
        status: "Invited",
        lastActive: "Pending",
    };
}
