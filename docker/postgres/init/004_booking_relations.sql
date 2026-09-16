ALTER TABLE bookings
    ADD COLUMN IF NOT EXISTS customer_id TEXT,
    ADD COLUMN IF NOT EXISTS pet_id TEXT;

UPDATE bookings
SET customer_id = 'customer-1001',
    pet_id = 'pet-1001'
WHERE id = 'booking-1001';

UPDATE bookings
SET customer_id = 'customer-1002',
    pet_id = 'pet-1002'
WHERE id = 'booking-1002';

UPDATE bookings
SET customer_id = 'customer-1003',
    pet_id = 'pet-1003'
WHERE id = 'booking-1003';

UPDATE bookings
SET customer_id = 'customer-1004',
    pet_id = 'pet-1004'
WHERE id = 'booking-1004';
