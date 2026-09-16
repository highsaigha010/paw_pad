import Sidebar from "@/app/components/layout/Sidebar";
import Settings from "@/app/features/settings/Settings";

/**
 * Composes the settings route with the shared staff sidebar.
 */
export default function SettingsPage() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Settings" />

            <section className="dashboardContent">
                <Settings />
            </section>
        </main>
    );
}
