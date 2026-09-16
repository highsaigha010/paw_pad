import Sidebar from "@/app/components/layout/Sidebar";
import Pets from "@/app/features/pets/Pets";

/**
 * Composes the pet registry route with the shared staff sidebar.
 */
export default function PetsPage() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Pets" />

            <section className="dashboardContent">
                <Pets />
            </section>
        </main>
    );
}
