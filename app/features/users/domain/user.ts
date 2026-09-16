// Lists roles supported by the staff user module.
export type UserRole = "Admin" | "Manager" | "Groomer" | "Front Desk";

// Lists user account states supported by staff management.
export type UserStatus = "Active" | "Invited" | "Disabled";

// Represents one staff user account.
export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastActive: string;
};

// Represents the data required to invite or create a staff user.
export type CreateUserInput = {
    name: string;
    email: string;
    role: UserRole;
};
