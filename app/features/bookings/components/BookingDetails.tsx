import type { WaitlistRequest } from "@/app/features/bookings/domain/booking";

type BookingDetailsProps = {
    waitlistRequests: WaitlistRequest[];
};

/**
 * Displays supporting booking details that help staff resolve requests.
 */
export default function BookingDetails({ waitlistRequests }: BookingDetailsProps) {
    return (
        <article className="bookingsPanel waitlistPanel">
            <p className="sectionEyebrow">Waitlist</p>
            <h3>Requests</h3>
            <div className="waitlistItems">
                {waitlistRequests.map((item) => (
                    <div key={item.id}>
                        <strong>{item.pet}</strong>
                        <p>{item.owner}</p>
                        <span>{item.request}</span>
                    </div>
                ))}
            </div>
        </article>
    );
}
