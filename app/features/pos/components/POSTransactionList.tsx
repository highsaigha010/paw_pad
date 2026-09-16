import type { SaleTransaction } from "@/app/features/pos/domain/pos";

type POSTransactionListProps = {
    recentSales: SaleTransaction[];
};

/**
 * Displays recent completed sales for register review.
 */
export default function POSTransactionList({ recentSales }: POSTransactionListProps) {
    return (
        <section className="posPanel posTransactionsPanel">
            <div className="posPanelHeader">
                <div>
                    <p className="sectionEyebrow">Activity</p>
                    <h3>Recent Sales</h3>
                </div>
            </div>

            <div className="posTransactionList">
                {recentSales.map((sale) => (
                    <article key={sale.id}>
                        <div>
                            <strong>{sale.customerName}</strong>
                            <p>{sale.paymentMethod} payment</p>
                        </div>
                        <span>${sale.total.toFixed(2)}</span>
                    </article>
                ))}
            </div>
        </section>
    );
}
