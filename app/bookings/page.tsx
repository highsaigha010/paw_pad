import Bookings from "@/app/features/bookings/Bookings";
import Sidebar from "@/app/components/layout/Sidebar";

export default function BookingsPage() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Bookings" />

            <section className="dashboardContent">
                <Bookings />
            </section>
        </main>
    );
}
