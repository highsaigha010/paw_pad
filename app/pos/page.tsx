import Sidebar from "@/app/components/layout/Sidebar";
import POS from "@/app/features/pos/POS";

/**
 * Displays the point-of-sale route shell.
 */
export default function POSPage() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="POS" />

            <section className="dashboardContent">
                <POS />
            </section>
        </main>
    );
}
