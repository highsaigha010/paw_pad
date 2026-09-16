import { fetchUsers } from "@/app/features/users/services/userApi";

/**
 * Prepares staff user data needed by the presentation layer.
 */
export async function getUserManagementData() {
    const users = await fetchUsers();

    return {
        users,
        summary: [
            { label: "Active Users", value: "12" },
            { label: "Invites Pending", value: "3" },
            { label: "Admin Roles", value: "2" },
        ],
    };
}
