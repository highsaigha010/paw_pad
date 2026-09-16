import Sidebar from "@/app/components/layout/Sidebar";
import Users from "@/app/features/users/Users";

/**
 * Composes the staff users route with the shared staff sidebar.
 */
export default function UsersPage() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Users" />

            <section className="dashboardContent">
                <Users />
            </section>
        </main>
    );
}
