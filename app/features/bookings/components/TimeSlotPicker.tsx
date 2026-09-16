import type { TimeSlot } from "@/app/features/bookings/domain/booking";

type TimeSlotPickerProps = {
    slots: TimeSlot[];
};

/**
 * Displays backend-approved time slots for the selected booking date.
 */
export default function TimeSlotPicker({ slots }: TimeSlotPickerProps) {
    return (
        <article className="bookingsPanel availabilityPanel">
            <p className="sectionEyebrow">Availability</p>
            <h3>Open Slots</h3>
            <div className="slotList">
                {slots.map((slot) => (
                    <button key={slot.id}>
                        {slot.time}
                        <span>{slot.availableGroomers} groomer{slot.availableGroomers === 1 ? "" : "s"}</span>
                    </button>
                ))}
            </div>
        </article>
    );
}
