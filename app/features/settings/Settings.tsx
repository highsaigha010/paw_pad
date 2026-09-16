import { getSettingsData } from "@/app/features/settings/application/getSettings";
import LogoutPanel from "@/app/features/settings/components/LogoutPanel";
import PasswordSettingsForm from "@/app/features/settings/components/PasswordSettingsForm";
import ProfileSettingsForm from "@/app/features/settings/components/ProfileSettingsForm";

/**
 * Composes the account settings screen for the signed-in staff user.
 */
export default async function Settings() {
    const { user } = await getSettingsData();

    return (
        <section className="settingsView">
            <div className="settingsHeader">
                <div>
                    <p className="sectionEyebrow">Settings</p>
                    <h2>Account Settings</h2>
                </div>
            </div>

            <div className="settingsWorkspace">
                <ProfileSettingsForm user={user} />
                <PasswordSettingsForm userId={user.id} />
                <LogoutPanel />
            </div>
        </section>
    );
}
