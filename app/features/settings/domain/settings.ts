// Represents editable profile information for the signed-in staff user.
export type UpdateProfileInput = {
    userId: string;
    name: string;
    email: string;
};

// Represents the fields needed to change a staff user's password.
export type ChangePasswordInput = {
    userId: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
