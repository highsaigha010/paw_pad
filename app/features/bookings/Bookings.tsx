import { Filter, Search } from "lucide-react";
import { getBookingManagementData } from "@/app/features/bookings/application/getAvailableSlots";
import BookingCalendar from "@/app/features/bookings/components/BookingCalendar";
import BookingDetails from "@/app/features/bookings/components/BookingDetails";
import BookingForm from "@/app/features/bookings/components/BookingForm";
import TimeSlotPicker from "@/app/features/bookings/components/TimeSlotPicker";

/**
 * Composes the booking management screen from feature components and workflow data.
 */
export default async function Bookings() {
    const { bookings, openSlots, ownerOptions, petOptions, waitlistRequests } = await getBookingManagementData();

    return (
        <section className="bookingsView">
            <div className="bookingsHeader">
                <div>
                    <p className="sectionEyebrow">Bookings</p>
                    <h2>Appointments</h2>
                </div>

                <BookingForm ownerOptions={ownerOptions} petOptions={petOptions} />
            </div>

            <div className="bookingsWorkspace">
                <article className="bookingsPanel bookingsTablePanel">
                    <div className="bookingsToolbar">
                        <label className="bookingSearch">
                            <Search size={17} />
                            <input placeholder="Search booking, pet, or owner" />
                        </label>

                        <div className="bookingFilters">
                            <button>Today</button>
                            <button>All status</button>
                            <button aria-label="Filter bookings">
                                <Filter size={17} />
                            </button>
                        </div>
                    </div>

                    <BookingCalendar bookings={bookings} />
                </article>

                <aside className="bookingsSideRail">
                    <TimeSlotPicker slots={openSlots} />
                    <BookingDetails waitlistRequests={waitlistRequests} />
                </aside>
            </div>
        </section>
    );
}
