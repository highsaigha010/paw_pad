import { Pool } from "pg";

// Keeps one PostgreSQL pool instance during local development hot reloads.
const globalForPostgres = globalThis as typeof globalThis & {
    pawPadPostgresPool?: Pool;
};

/**
 * Returns the PostgreSQL connection pool used by server-side services.
 */
export function getDatabasePool() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not configured.");
    }

    if (!globalForPostgres.pawPadPostgresPool) {
        globalForPostgres.pawPadPostgresPool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }

    return globalForPostgres.pawPadPostgresPool;
}
