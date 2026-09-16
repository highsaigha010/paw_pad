import { Search } from "lucide-react";
import { getCustomerDirectoryData } from "@/app/features/customers/application/getCustomers";
import CustomerDetails from "@/app/features/customers/components/CustomerDetails";
import CustomerForm from "@/app/features/customers/components/CustomerForm";
import CustomerTable from "@/app/features/customers/components/CustomerTable";

/**
 * Composes the customer directory screen from feature components and workflow data.
 */
export default async function Customers() {
    const { customers, customerTasks, summary } = await getCustomerDirectoryData();

    return (
        <section className="customersView">
            <div className="customersHeader">
                <div>
                    <p className="sectionEyebrow">Customers</p>
                    <h2>Client Directory</h2>
                </div>

                <CustomerForm />
            </div>

            <section className="customerSummary" aria-label="Customer summary">
                {summary.map((item) => (
                    <article key={item.label}>
                        <p>{item.label}</p>
                        <strong>{item.value}</strong>
                    </article>
                ))}
            </section>

            <div className="customersWorkspace">
                <article className="customersPanel customerTablePanel">
                    <div className="customersToolbar">
                        <label className="customerSearch">
                            <Search size={17} />
                            <input placeholder="Search customers or pets" />
                        </label>

                        <div className="customerActions">
                            <button>Active</button>
                            <button>Newest</button>
                        </div>
                    </div>

                    <CustomerTable customers={customers} />
                </article>

                <CustomerDetails customerTasks={customerTasks} />
            </div>
        </section>
    );
}
