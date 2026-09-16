ALTER TABLE users
ADD COLUMN IF NOT EXISTS password_hash TEXT;

UPDATE users
SET password_hash = '120000:pawpad_demo_salt_01:57b120969dce6924532a8d0a7817ed6fdfba091d9879d3671281fa3ee310a3e124b22269bd47c3b2d976102365b9588944f9c57613cd068b89fbdcf5b6159a8c'
WHERE email = 'admin@pawpad.local'
  AND password_hash IS NULL;
