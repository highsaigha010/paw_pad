import { LogOut } from "lucide-react";
import { logoutFromSettings } from "@/app/features/settings/application/settingsActions";

/**
 * Displays the logout action for the current staff session.
 */
export default function LogoutPanel() {
    return (
        <form action={logoutFromSettings} className="settingsPanel logoutPanel">
            <div>
                <p className="sectionEyebrow">Session</p>
                <h3>Logout</h3>
            </div>

            <button type="submit">
                <LogOut size={18} />
                <span>Logout</span>
            </button>
        </form>
    );
}
