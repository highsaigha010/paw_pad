"use client";

import { CreditCard, Minus, Plus, Receipt, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { createSale } from "@/app/features/pos/application/createSale";
import type { PaymentMethod, POSBookingOption, SaleCartItem, SaleCatalogItem } from "@/app/features/pos/domain/pos";
import { calculateSaleTotals } from "@/app/features/pos/domain/posRules";

type POSRegisterProps = {
    bookingOptions: POSBookingOption[];
    catalogItems: SaleCatalogItem[];
};

/**
 * Handles POS cart interaction for staff checkout.
 */
export default function POSRegister({ bookingOptions, catalogItems }: POSRegisterProps) {
    const [selectedBookingId, setSelectedBookingId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
    const [cartItems, setCartItems] = useState<SaleCartItem[]>([]);
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totals = useMemo(() => calculateSaleTotals(cartItems), [cartItems]);

    function handleBookingChange(bookingId: string) {
        setSelectedBookingId(bookingId);

        const booking = bookingOptions.find((item) => item.id === bookingId);

        if (!booking) {
            setCustomerName("");
            setCartItems([]);
            return;
        }

        setCustomerName(booking.customerName);
        setCartItems([
            {
                id: `booking-service-${booking.id}`,
                name: `${booking.serviceName} - ${booking.petName}`,
                type: "Service",
                price: booking.servicePrice,
                quantity: 1,
            },
        ]);
        setMessage("");
    }

    function addItem(item: SaleCatalogItem) {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                return currentItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
                );
            }

            return [...currentItems, { ...item, quantity: 1 }];
        });
    }

    function updateQuantity(itemId: string, quantity: number) {
        setCartItems((currentItems) =>
            currentItems
                .map((item) => (item.id === itemId ? { ...item, quantity } : item))
                .filter((item) => item.quantity > 0),
        );
    }

    async function handleCompleteSale() {
        setIsSubmitting(true);
        setMessage("");

        const result = await createSale({
            customerName,
            items: cartItems,
            paymentMethod,
        });

        setMessage(result.message);
        setIsSubmitting(false);

        if (result.ok) {
            setSelectedBookingId("");
            setCustomerName("");
            setPaymentMethod("Cash");
            setCartItems([]);
        }
    }

    return (
        <div className="posRegisterGrid">
            <section className="posPanel posCatalogPanel">
                <div className="posPanelHeader">
                    <div>
                        <p className="sectionEyebrow">Catalog</p>
                        <h3>Services and Products</h3>
                    </div>
                </div>

                <div className="posCatalogList">
                    {catalogItems.map((item) => (
                        <button type="button" key={item.id} onClick={() => addItem(item)}>
                            <span>{item.type}</span>
                            <strong>{item.name}</strong>
                            <p>${item.price.toFixed(2)}</p>
                        </button>
                    ))}
                </div>
            </section>

            <section className="posPanel posCartPanel">
                <div className="posPanelHeader">
                    <div>
                        <p className="sectionEyebrow">Checkout</p>
                        <h3>Current Sale</h3>
                    </div>
                    <Receipt size={20} />
                </div>

                <label className="posField">
                    Booking
                    <select value={selectedBookingId} onChange={(event) => handleBookingChange(event.target.value)}>
                        <option value="">Walk-in sale</option>
                        {bookingOptions.map((booking) => (
                            <option value={booking.id} key={booking.id}>
                                {booking.date} {booking.time} - {booking.customerName} / {booking.petName}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="posField">
                    Customer
                    <input
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        placeholder="Customer name"
                    />
                </label>

                <div className="posCartItems">
                    {cartItems.length === 0 ? (
                        <p className="posEmptyCart">No items added.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div className="posCartItem" key={item.id}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>${item.price.toFixed(2)} each</p>
                                </div>

                                <div className="posQuantityControl">
                                    <button
                                        type="button"
                                        aria-label={`Decrease ${item.name}`}
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus size={15} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        type="button"
                                        aria-label={`Increase ${item.name}`}
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus size={15} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label={`Remove ${item.name}`}
                                        onClick={() => updateQuantity(item.id, 0)}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <label className="posField">
                    Payment method
                    <select
                        value={paymentMethod}
                        onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="GCash">GCash</option>
                    </select>
                </label>

                <div className="posTotals">
                    <span>Subtotal <strong>${totals.subtotal.toFixed(2)}</strong></span>
                    <span>Tax <strong>${totals.tax.toFixed(2)}</strong></span>
                    <span>Total <strong>${totals.total.toFixed(2)}</strong></span>
                </div>

                {message ? <p className={message.includes("completed") ? "formSuccess" : "formError"}>{message}</p> : null}

                <button className="primaryAction" type="button" disabled={isSubmitting} onClick={handleCompleteSale}>
                    <CreditCard size={17} />
                    {isSubmitting ? "Processing" : "Complete Sale"}
                </button>
            </section>
        </div>
    );
}
