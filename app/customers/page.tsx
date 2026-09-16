import Customers from "@/app/features/customers/Customers";
import Sidebar from "@/app/components/layout/Sidebar";

/**
 * Composes the customer management route with the shared app sidebar.
 */
export default function CustomersPage() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Customers" />

            <section className="dashboardContent">
                <Customers />
            </section>
        </main>
    );
}
