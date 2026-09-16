import Sidebar from "./components/layout/Sidebar";
import DashboardHeader from "@/app/components/layout/DashboardHeader";
import { AlertCircle, CalendarCheck, Clock, DollarSign, PawPrint, Scissors } from "lucide-react";

const stats = [
    { label: "Appointments", value: "18", detail: "4 done", icon: CalendarCheck },
    { label: "In Care", value: "7", detail: "3 grooming", icon: PawPrint },
    { label: "Due Pickup", value: "4", detail: "today", icon: Clock },
    { label: "Revenue", value: "$1.2k", detail: "+12%", icon: DollarSign },
];

const queue = [
    { label: "Intake", count: "2" },
    { label: "Bathing", count: "3" },
    { label: "Styling", count: "2" },
    { label: "Ready", count: "4" },
];

const services = [
    { name: "Full Groom", value: "8", icon: Scissors },
    { name: "Bath & Brush", value: "6", icon: PawPrint },
    { name: "Nail Trim", value: "4", icon: Scissors },
];

const alerts = [
    "Bella pickup overdue",
    "Two pending deposits",
    "Low shampoo inventory",
];

export default function Home() {
    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Dashboard" />

            <section className="dashboardContent">
                <DashboardHeader />

                <section className="statsGrid compactStats" aria-label="Dashboard summary">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <article className="statCard" key={stat.label}>
                                <div className="statCardTop">
                                    <p>{stat.label}</p>
                                    <Icon size={17} />
                                </div>
                                <strong>{stat.value}</strong>
                                <span>{stat.detail}</span>
                            </article>
                        );
                    })}
                </section>

                <div className="dashboardOverview">
                    <article className="panel operationsPanel">
                        <div className="panelHeader compact">
                            <div>
                                <p>Live Flow</p>
                                <h3>Service Pipeline</h3>
                            </div>
                        </div>
                        <div className="pipeline">
                            {queue.map((item) => (
                                <div key={item.label}>
                                    <strong>{item.count}</strong>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="panel servicesPanel">
                        <div className="panelHeader compact">
                            <div>
                                <p>Demand</p>
                                <h3>Service Mix</h3>
                            </div>
                        </div>
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <div className="serviceItem" key={service.name}>
                                    <div>
                                        <Icon size={17} />
                                        <span>{service.name}</span>
                                    </div>
                                    <strong>{service.value}</strong>
                                </div>
                            );
                        })}
                    </article>

                    <article className="panel alertsPanel">
                        <div className="panelHeader compact">
                            <div>
                                <p>Attention</p>
                                <h3>Needs Action</h3>
                            </div>
                            <AlertCircle size={18} />
                        </div>
                        {alerts.map((alert) => (
                            <div className="alertItem" key={alert}>
                                {alert}
                            </div>
                        ))}
                    </article>
                </div>
            </section>
        </main>
    );
}
