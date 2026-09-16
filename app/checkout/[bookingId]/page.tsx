import Sidebar from "@/app/components/layout/Sidebar";
import CheckoutSummary from "@/app/features/payments/components/CheckoutSummary";
import PaymentMethod from "@/app/features/payments/components/PaymentMethod";
import PaymentStatus from "@/app/features/payments/components/PaymentStatus";

type CheckoutPageProps = {
    params: Promise<{
        bookingId: string;
    }>;
};

/**
 * Composes the checkout route for a specific booking.
 */
export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { bookingId } = await params;

    return (
        <main className="dashboardLayout">
            <Sidebar activeItem="Bookings" />

            <section className="dashboardContent">
                <div className="checkoutView">
                    <CheckoutSummary bookingId={bookingId} />
                    <div className="checkoutSide">
                        <PaymentMethod />
                        <PaymentStatus />
                    </div>
                </div>
            </section>
        </main>
    );
}
