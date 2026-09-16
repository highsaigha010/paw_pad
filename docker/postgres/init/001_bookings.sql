CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    pet TEXT NOT NULL,
    owner TEXT NOT NULL,
    service TEXT NOT NULL,
    service_duration_minutes INTEGER NOT NULL,
    groomer TEXT NOT NULL,
    status TEXT NOT NULL,
    price TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO bookings (
    id,
    booking_date,
    booking_time,
    pet,
    owner,
    service,
    service_duration_minutes,
    groomer,
    status,
    price
) VALUES
    ('booking-1001', '2026-08-31', '09:00', 'Mochi', 'A. Santos', 'Full Groom', 90, 'Jenna', 'Confirmed', '$85'),
    ('booking-1002', '2026-08-31', '10:30', 'Bella', 'M. Reyes', 'Bath & Brush', 60, 'Carlo', 'Checked in', '$55'),
    ('booking-1003', '2026-08-31', '13:00', 'Rocky', 'D. Cruz', 'Nail Trim', 20, 'Mia', 'Pending', '$22'),
    ('booking-1004', '2026-08-31', '14:30', 'Luna', 'K. Lim', 'De-shed Treatment', 75, 'Jenna', 'Confirmed', '$70')
ON CONFLICT (id) DO NOTHING;
