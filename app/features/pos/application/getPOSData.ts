import type { POSBookingOption } from "@/app/features/pos/domain/pos";
import { fetchBookings } from "@/app/features/bookings/services/bookingApi";
import { fetchRecentSales, fetchSaleCatalog } from "@/app/features/pos/services/posApi";

/**
 * Converts the stored booking price string into a numeric POS amount.
 */
function parseBookingPrice(price: string) {
    const amount = Number(price.replace(/[^0-9.]/g, ""));

    return Number.isFinite(amount) ? amount : 0;
}

/**
 * Prepares the POS screen data needed by the presentation layer.
 */
export async function getPOSData() {
    const [bookings, catalogItems, recentSales] = await Promise.all([
        fetchBookings(),
        fetchSaleCatalog(),
        fetchRecentSales(),
    ]);

    const bookingOptions: POSBookingOption[] = bookings
        .filter((booking) => booking.status !== "Cancelled")
        .map((booking) => ({
            id: booking.id,
            date: booking.date,
            time: booking.time,
            customerName: booking.owner,
            petName: booking.pet,
            serviceName: booking.service,
            servicePrice: parseBookingPrice(booking.price),
        }));

    const summary = [
        { label: "Open Register", value: "$428" },
        { label: "Paid Sales", value: String(recentSales.length) },
        { label: "Catalog Items", value: String(catalogItems.length) },
    ];

    return {
        bookingOptions,
        catalogItems,
        recentSales,
        summary,
    };
}
