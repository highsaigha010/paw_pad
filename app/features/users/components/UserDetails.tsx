import { KeyRound, ShieldAlert } from "lucide-react";

/**
 * Displays access-control side details for staff users.
 */
export default function UserDetails() {
    return (
        <aside className="usersSideRail">
            <article className="usersPanel accessPanel">
                <div className="sidePanelTitle">
                    <div>
                        <p className="sectionEyebrow">Security</p>
                        <h3>Access Policy</h3>
                    </div>
                    <KeyRound size={19} />
                </div>
                <div className="accessRule">Admin users can manage settings and financial records.</div>
                <div className="accessRule">Groomers can only update assigned service work.</div>
            </article>

            <article className="usersPanel accessPanel">
                <div className="sidePanelTitle">
                    <div>
                        <p className="sectionEyebrow">Review</p>
                        <h3>Permissions</h3>
                    </div>
                    <ShieldAlert size={19} />
                </div>
                <div className="accessRule">2 admin accounts need quarterly review.</div>
                <div className="accessRule">3 invites are still pending.</div>
            </article>
        </aside>
    );
}
