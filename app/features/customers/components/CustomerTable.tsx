import { Mail, MoreHorizontal, Phone } from "lucide-react";
import type { Customer } from "@/app/features/customers/domain/customer";
import { getCustomerStatusClass } from "@/app/features/customers/domain/customerRules";

type CustomerTableProps = {
    customers: Customer[];
};

/**
 * Displays customer records in a structured directory table.
 */
export default function CustomerTable({ customers }: CustomerTableProps) {
    return (
        <div className="customersTable">
            <div className="customersTableHead">
                <span>Customer</span>
                <span>Contact</span>
                <span>Pets</span>
                <span>Visits</span>
                <span>Last Visit</span>
                <span>Status</span>
                <span />
            </div>

            {customers.map((customer) => (
                <div className="customerRow" key={customer.id}>
                    <div>
                        <strong>{customer.name}</strong>
                        <p>{customer.email}</p>
                    </div>
                    <div className="contactStack">
                        <span>
                            <Phone size={14} />
                            {customer.phone}
                        </span>
                        <span>
                            <Mail size={14} />
                            {customer.email}
                        </span>
                    </div>
                    <span>{customer.pets}</span>
                    <strong>{customer.visits}</strong>
                    <span>{customer.lastVisit}</span>
                    <mark className={`customerStatus ${getCustomerStatusClass(customer.status)}`}>
                        {customer.status}
                    </mark>
                    <button aria-label={`Open actions for ${customer.name}`}>
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}
