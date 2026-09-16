import type { Booking } from "@/app/features/bookings/domain/booking";
import { getBookingStatusClass } from "@/app/features/bookings/domain/bookingRules";

type BookingCalendarProps = {
    bookings: Booking[];
};

/**
 * Displays bookings in a schedule-focused calendar table.
 */
export default function BookingCalendar({ bookings }: BookingCalendarProps) {
    return (
        <div className="bookingsTable">
            <div className="bookingsTableHead">
                <span>Time</span>
                <span>Client</span>
                <span>Service</span>
                <span>Duration</span>
                <span>Groomer</span>
                <span>Status</span>
                <span>Price</span>
            </div>

            {bookings.map((booking) => (
                <div className="bookingRow" key={booking.id}>
                    <time>{booking.time}</time>
                    <div>
                        <strong>{booking.pet}</strong>
                        <p>{booking.owner}</p>
                    </div>
                    <span>{booking.service}</span>
                    <span>{booking.serviceDurationMinutes} min</span>
                    <span>{booking.groomer}</span>
                    <mark className={`bookingStatus ${getBookingStatusClass(booking.status)}`}>
                        {booking.status}
                    </mark>
                    <strong>{booking.price}</strong>
                </div>
            ))}
        </div>
    );
}
