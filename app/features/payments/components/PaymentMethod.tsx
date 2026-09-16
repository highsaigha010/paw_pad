/**
 * Displays available payment methods for staff checkout.
 */
export default function PaymentMethod() {
    return (
        <article className="checkoutPanel">
            <p className="sectionEyebrow">Payment</p>
            <h3>Method</h3>
            <div className="paymentMethodList">
                <button>Card</button>
                <button>Cash</button>
                <button>Online</button>
            </div>
        </article>
    );
}
