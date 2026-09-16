import { Mail, MoreHorizontal, ShieldCheck } from "lucide-react";
import type { User } from "@/app/features/users/domain/user";
import { getUserStatusClass } from "@/app/features/users/domain/userRules";

type UserTableProps = {
    users: User[];
};

/**
 * Displays staff users in a structured access table.
 */
export default function UserTable({ users }: UserTableProps) {
    return (
        <div className="usersTable">
            <div className="usersTableHead">
                <span>User</span>
                <span>Role</span>
                <span>Status</span>
                <span>Last Active</span>
                <span />
            </div>

            {users.map((user) => (
                <div className="userRow" key={user.id}>
                    <div>
                        <strong>{user.name}</strong>
                        <p>
                            <Mail size={14} />
                            {user.email}
                        </p>
                    </div>
                    <span>
                        <ShieldCheck size={14} />
                        {user.role}
                    </span>
                    <mark className={`userStatus ${getUserStatusClass(user.status)}`}>{user.status}</mark>
                    <span>{user.lastActive}</span>
                    <button aria-label={`Open actions for ${user.name}`}>
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}
