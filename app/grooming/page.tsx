import Sidebar from "@/app/components/layout/Sidebar";
import Grooming from "@/app/features/grooming/Grooming";

/**
 * Composes the grooming operations route with the shared staff sidebar.
 */
export default function GroomingPage() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Grooming" />

            <section className="dashboardContent">
                <Grooming />
            </section>
        </main>
    );
}
