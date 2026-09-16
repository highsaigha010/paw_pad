import { canSelectTimeSlot } from "@/app/features/bookings/domain/bookingRules";
import { fetchAvailableSlots, fetchBookings, fetchWaitlistRequests } from "@/app/features/bookings/services/bookingApi";
import { fetchCustomers } from "@/app/features/customers/services/customerApi";
import { fetchPets } from "@/app/features/pets/services/petApi";

/**
 * Gets selectable slots for a booking date and service duration.
 */
export async function getAvailableSlots(date: string, serviceDurationMinutes: number) {
    const slots = await fetchAvailableSlots(date, serviceDurationMinutes);

    return slots.filter(canSelectTimeSlot);
}

/**
 * Prepares the booking screen data needed by the presentation layer.
 */
export async function getBookingManagementData() {
    const [bookings, customers, pets, waitlistRequests, openSlots] = await Promise.all([
        fetchBookings(),
        fetchCustomers(),
        fetchPets(),
        fetchWaitlistRequests(),
        getAvailableSlots("2026-08-31", 60),
    ]);

    return {
        bookings,
        ownerOptions: customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
        })),
        petOptions: pets.map((pet) => ({
            id: pet.id,
            ownerId: pet.ownerId,
            name: pet.name,
            breed: pet.breed,
        })),
        waitlistRequests,
        openSlots,
    };
}
