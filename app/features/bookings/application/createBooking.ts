"use server";

import type { BookingStatus, CreateBookingInput } from "@/app/features/bookings/domain/booking";
import { canCancelBooking, validateCreateBookingInput } from "@/app/features/bookings/domain/bookingRules";
import { postBooking } from "@/app/features/bookings/services/bookingApi";

/**
 * Coordinates the create booking workflow.
 */
export async function createBooking(input: CreateBookingInput) {
    if (!validateCreateBookingInput(input)) {
        throw new Error("Booking cannot be created because required fields are missing.");
    }

    return postBooking(input);
}

/**
 * Coordinates the cancel booking workflow and applies domain rules first.
 */
export async function cancelBooking(bookingId: string, status: BookingStatus) {
    if (!canCancelBooking(status)) {
        throw new Error(`Booking ${bookingId} cannot be cancelled from ${status} status.`);
    }

    return {
        bookingId,
        status: "Cancelled" as BookingStatus,
    };
}

/**
 * Coordinates the update booking status workflow.
 */
export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
    return {
        bookingId,
        status,
    };
}
