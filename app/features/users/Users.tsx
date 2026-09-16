import { Search } from "lucide-react";
import { getUserManagementData } from "@/app/features/users/application/getUsers";
import UserDetails from "@/app/features/users/components/UserDetails";
import UserForm from "@/app/features/users/components/UserForm";
import UserTable from "@/app/features/users/components/UserTable";

/**
 * Composes the staff user management screen from feature components and workflow data.
 */
export default async function Users() {
    const { summary, users } = await getUserManagementData();

    return (
        <section className="usersView">
            <div className="usersHeader">
                <div>
                    <p className="sectionEyebrow">Users</p>
                    <h2>Staff Access</h2>
                </div>

                <UserForm />
            </div>

            <section className="userSummary" aria-label="User summary">
                {summary.map((item) => (
                    <article key={item.label}>
                        <p>{item.label}</p>
                        <strong>{item.value}</strong>
                    </article>
                ))}
            </section>

            <div className="usersWorkspace">
                <article className="usersPanel userTablePanel">
                    <div className="usersToolbar">
                        <label className="userSearch">
                            <Search size={17} />
                            <input placeholder="Search staff or role" />
                        </label>

                        <div className="userActions">
                            <button>Active</button>
                            <button>Role</button>
                        </div>
                    </div>

                    <UserTable users={users} />
                </article>

                <UserDetails />
            </div>
        </section>
    );
}
