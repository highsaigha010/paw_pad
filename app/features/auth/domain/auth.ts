// Represents credentials submitted by a user during login.
export type LoginInput = {
    email: string;
    password: string;
};

// Represents the data required to create a new user account.
export type SignUpInput = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// Represents the authenticated user stored in the session cookie.
export type AuthSession = {
    userId: string;
    name: string;
    email: string;
    role: string;
};
