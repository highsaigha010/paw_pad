import Link from "next/link";
import {
    CalendarDays,
    CircleDollarSign,
    LayoutDashboard,
    PawPrint,
    Scissors,
    Settings,
    Users,
} from "lucide-react";

const menuItems = [
    {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Bookings",
        href: "/bookings",
        icon: CalendarDays,
    },
    {
        name: "Customers",
        href: "/customers",
        icon: Users,
    },
    {
        name: "Users",
        href: "/users",
        icon: Users,
    },
    {
        name: "Pets",
        href: "/pets",
        icon: PawPrint,
    },
    {
        name: "Grooming",
        href: "/grooming",
        icon: Scissors,
    },
    {
        name: "POS",
        href: "/pos",
        icon: CircleDollarSign,
    },
];

type SidebarProps = {
    activeItem?: string;
};

export default function Sidebar({ activeItem = "Dashboard" }: SidebarProps) {
    return (
        <aside className="sidebar">
            <div>
                <div className="sidebarBrand">
                    <div className="brandIcon">
                        <PawPrint size={24} />
                    </div>

                    <div>
                        <h1>The Paw Pad</h1>
                        <p>Operations</p>
                    </div>
                </div>

                <nav className="sidebarNavigation" aria-label="Main navigation">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                href={item.href}
                                className={`sidebarMenu ${item.name === activeItem ? "active" : ""}`}
                                key={item.name}
                            >
                                <Icon size={19} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="sidebarFooter">
                <Link
                    href="/settings"
                    className={`sidebarMenu ${activeItem === "Settings" ? "active" : ""}`}
                >
                    <Settings size={19} />
                    <span>Settings</span>
                </Link>
                <div className="userBadge">
                    <span>AD</span>
                    <div>
                        <strong>Admin Desk</strong>
                        <p>Front office</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
