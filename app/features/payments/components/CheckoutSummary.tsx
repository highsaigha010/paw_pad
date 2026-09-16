type CheckoutSummaryProps = {
    bookingId: string;
};

/**
 * Displays the booking charges that will be paid during checkout.
 */
export default function CheckoutSummary({ bookingId }: CheckoutSummaryProps) {
    return (
        <article className="checkoutPanel">
            <p className="sectionEyebrow">Checkout</p>
            <h2>Booking {bookingId}</h2>
            <div className="checkoutLine">
                <span>Full Groom</span>
                <strong>$85</strong>
            </div>
            <div className="checkoutLine">
                <span>Tax</span>
                <strong>$7</strong>
            </div>
            <div className="checkoutTotal">
                <span>Total</span>
                <strong>$92</strong>
            </div>
        </article>
    );
}
