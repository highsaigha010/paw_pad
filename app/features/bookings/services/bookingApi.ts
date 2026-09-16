import type { Booking, CreateBookingInput, TimeSlot, WaitlistRequest } from "@/app/features/bookings/domain/booking";
import { getDatabasePool } from "@/app/services/database";

type BookingRow = {
    id: string;
    customer_id: string | null;
    pet_id: string | null;
    booking_date: Date;
    booking_time: string;
    pet: string;
    owner: string;
    service: string;
    service_duration_minutes: number;
    groomer: string;
    status: Booking["status"];
    price: string;
};

// Temporary booking data that stands in for records returned by the backend API.
const bookings: Booking[] = [
    {
        id: "booking-1001",
        customerId: "customer-1001",
        petId: "pet-1001",
        date: "2026-08-31",
        time: "09:00",
        pet: "Mochi",
        owner: "A. Santos",
        service: "Full Groom",
        serviceDurationMinutes: 90,
        groomer: "Jenna",
        status: "Confirmed",
        price: "$85",
    },
    {
        id: "booking-1002",
        customerId: "customer-1002",
        petId: "pet-1002",
        date: "2026-08-31",
        time: "10:30",
        pet: "Bella",
        owner: "M. Reyes",
        service: "Bath & Brush",
        serviceDurationMinutes: 60,
        groomer: "Carlo",
        status: "Checked in",
        price: "$55",
    },
    {
        id: "booking-1003",
        customerId: "customer-1003",
        petId: "pet-1003",
        date: "2026-08-31",
        time: "13:00",
        pet: "Rocky",
        owner: "D. Cruz",
        service: "Nail Trim",
        serviceDurationMinutes: 20,
        groomer: "Mia",
        status: "Pending",
        price: "$22",
    },
    {
        id: "booking-1004",
        customerId: "customer-1004",
        petId: "pet-1004",
        date: "2026-08-31",
        time: "14:30",
        pet: "Luna",
        owner: "K. Lim",
        service: "De-shed Treatment",
        serviceDurationMinutes: 75,
        groomer: "Jenna",
        status: "Confirmed",
        price: "$70",
    },
];

// Temporary waitlist data that stands in for records returned by the backend API.
const waitlistRequests: WaitlistRequest[] = [
    { id: "waitlist-2001", pet: "Charlie", owner: "P. Garcia", request: "Any afternoon slot" },
    { id: "waitlist-2002", pet: "Nala", owner: "R. Tan", request: "Full groom with Jenna" },
    { id: "waitlist-2003", pet: "Oreo", owner: "S. Lee", request: "Weekend cancellation" },
];

// Temporary availability data that represents the backend availability response.
const availableSlots: TimeSlot[] = [
    { id: "slot-1130", time: "11:30 AM", availableGroomers: 2, roomAvailable: true },
    { id: "slot-1500", time: "03:00 PM", availableGroomers: 1, roomAvailable: true },
    { id: "slot-1615", time: "04:15 PM", availableGroomers: 1, roomAvailable: false },
];

/**
 * Converts a database row into the booking domain model used by the app.
 */
function mapBookingRow(row: BookingRow): Booking {
    return {
        id: row.id,
        customerId: row.customer_id ?? undefined,
        petId: row.pet_id ?? undefined,
        date: row.booking_date.toISOString().slice(0, 10),
        time: row.booking_time,
        pet: row.pet,
        owner: row.owner,
        service: row.service,
        serviceDurationMinutes: row.service_duration_minutes,
        groomer: row.groomer,
        status: row.status,
        price: row.price,
    };
}

/**
 * Loads bookings from the backend API.
 *
 * This uses PostgreSQL when DATABASE_URL is configured and falls back to local data during early development.
 */
export async function fetchBookings() {
    if (!process.env.DATABASE_URL) {
        return bookings;
    }

    try {
        const result = await getDatabasePool().query<BookingRow>(`
            SELECT
                id,
                customer_id,
                pet_id,
                booking_date,
                booking_time,
                pet,
                owner,
                service,
                service_duration_minutes,
                groomer,
                status,
                price
            FROM bookings
            ORDER BY booking_date ASC, booking_time ASC
        `);

        return result.rows.map(mapBookingRow);
    } catch (error) {
        console.error("Failed to load bookings from PostgreSQL.", error);
        return bookings;
    }
}

/**
 * Checks whether the PostgreSQL database can be reached by the app.
 */
export async function checkBookingDatabaseConnection() {
    const result = await getDatabasePool().query<{ connected: number }>("SELECT 1 AS connected");

    return result.rows[0]?.connected === 1;
}

/**
 * Loads fallback booking data for seed and local development tasks.
 */
export function getFallbackBookings() {
    return bookings;
}

/**
 * Loads waitlist requests from the backend API.
 *
 * This currently returns local data until the REST backend is available.
 */
export async function fetchWaitlistRequests() {
    return waitlistRequests;
}

/**
 * Requests available time slots for a date and service duration.
 *
 * The backend must validate operating hours, employee schedules, existing appointments,
 * service duration, and hotel room availability before returning slots.
 */
export async function fetchAvailableSlots(date: string, serviceDurationMinutes: number) {
    void date;
    void serviceDurationMinutes;

    return availableSlots;
}

/**
 * Sends a create booking request to the backend API.
 *
 * The backend must re-check availability before it persists the booking.
 */
export async function postBooking(input: CreateBookingInput) {
    if (process.env.DATABASE_URL) {
        try {
            const id = `booking-${Date.now()}`;
            const result = await getDatabasePool().query<BookingRow>(
                `
                    INSERT INTO bookings (
                        id,
                        customer_id,
                        pet_id,
                        booking_date,
                        booking_time,
                        pet,
                        owner,
                        service,
                        service_duration_minutes,
                        groomer,
                        status,
                        price
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Pending', $11)
                    RETURNING
                        id,
                        customer_id,
                        pet_id,
                        booking_date,
                        booking_time,
                        pet,
                        owner,
                        service,
                        service_duration_minutes,
                        groomer,
                        status,
                        price
                `,
                [
                    id,
                    input.customerId,
                    input.petId,
                    input.date,
                    input.time,
                    input.pet,
                    input.owner,
                    input.service,
                    input.serviceDurationMinutes,
                    input.groomer,
                    input.price,
                ],
            );

            return mapBookingRow(result.rows[0]);
        } catch (error) {
            console.error("Failed to create booking in PostgreSQL.", error);
        }
    }

    return {
        ...input,
        id: "booking-draft",
        status: "Pending" as const,
    };
}
