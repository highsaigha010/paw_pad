import { CalendarDays, Search } from "lucide-react";

export default function DashboardHeader() {
    return (
        <header className="dashboardHeader">
            <div>
                <p className="currentDate">MONDAY, AUGUST 31</p>
                <h2>Dashboard</h2>
            </div>

            <div className="headerActions">
                <label className="searchBox">
                    <Search size={17} />
                    <input placeholder="Search pets or customers" />
                </label>

                <button className="newBookingButton">
                    <CalendarDays size={18} />
                    <span>New Booking</span>
                </button>
            </div>
        </header>
    );
}
