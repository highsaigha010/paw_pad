import type { BookingStatus, CreateBookingInput, TimeSlot } from "@/app/features/bookings/domain/booking";

/**
 * Returns the CSS class suffix for a booking status badge.
 */
export function getBookingStatusClass(status: BookingStatus) {
    return status.toLowerCase().replace(" ", "");
}

/**
 * Checks whether a booking can be cancelled by staff.
 */
export function canCancelBooking(status: BookingStatus) {
    return status !== "Checked in" && status !== "Cancelled";
}

/**
 * Validates the minimum fields needed before the frontend submits a booking.
 */
export function validateCreateBookingInput(input: CreateBookingInput) {
    return Boolean(
        input.date &&
        input.time &&
        input.customerId &&
        input.petId &&
        input.pet &&
        input.owner &&
        input.service &&
        input.groomer,
    );
}

/**
 * Checks whether a returned slot can still be selected by the customer.
 */
export function canSelectTimeSlot(slot: TimeSlot) {
    return slot.availableGroomers > 0 && slot.roomAvailable;
}
