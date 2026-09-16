// Lists the booking states supported by the booking workflow.
export type BookingStatus = "Draft" | "Confirmed" | "Checked in" | "Pending" | "Cancelled";

// Represents one booking record used by the booking feature.
export type Booking = {
    id: string;
    date: string;
    time: string;
    customerId?: string;
    petId?: string;
    pet: string;
    owner: string;
    service: string;
    serviceDurationMinutes: number;
    groomer: string;
    status: BookingStatus;
    price: string;
};

// Represents a customer option shown in the create booking form.
export type BookingOwnerOption = {
    id: string;
    name: string;
    email: string;
};

// Represents a pet option shown after selecting a booking owner.
export type BookingPetOption = {
    id: string;
    ownerId: string;
    name: string;
    breed: string;
};

// Represents a selectable time returned by availability checks.
export type TimeSlot = {
    id: string;
    time: string;
    availableGroomers: number;
    roomAvailable: boolean;
};

// Represents a customer request waiting for an available booking slot.
export type WaitlistRequest = {
    id: string;
    pet: string;
    owner: string;
    request: string;
};

// Represents the input required to create a booking.
export type CreateBookingInput = {
    date: string;
    time: string;
    customerId: string;
    petId: string;
    pet: string;
    owner: string;
    service: string;
    serviceDurationMinutes: number;
    groomer: string;
    price: string;
};
