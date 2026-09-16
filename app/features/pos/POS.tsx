import { Search } from "lucide-react";
import { getPOSData } from "@/app/features/pos/application/getPOSData";
import POSRegister from "@/app/features/pos/components/POSRegister";
import POSTransactionList from "@/app/features/pos/components/POSTransactionList";

/**
 * Composes the point-of-sale workspace from POS feature data and components.
 */
export default async function POS() {
    const { bookingOptions, catalogItems, recentSales, summary } = await getPOSData();

    return (
        <section className="posView">
            <div className="posHeader">
                <div>
                    <p className="sectionEyebrow">POS</p>
                    <h2>Register</h2>
                </div>

                <label className="posSearch">
                    <Search size={17} />
                    <input placeholder="Search item or receipt" />
                </label>
            </div>

            <section className="posSummary" aria-label="POS summary">
                {summary.map((item) => (
                    <article key={item.label}>
                        <p>{item.label}</p>
                        <strong>{item.value}</strong>
                    </article>
                ))}
            </section>

            <div className="posWorkspace">
                <POSRegister bookingOptions={bookingOptions} catalogItems={catalogItems} />
                <POSTransactionList recentSales={recentSales} />
            </div>
        </section>
    );
}
