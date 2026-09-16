CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    status TEXT NOT NULL,
    last_active TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (id, name, email, role, status, last_active) VALUES
    ('user-1001', 'Admin Desk', 'admin@pawpad.local', 'Admin', 'Active', 'Today'),
    ('user-1002', 'Jenna Flores', 'jenna@pawpad.local', 'Groomer', 'Active', 'Today'),
    ('user-1003', 'Carlo Reyes', 'carlo@pawpad.local', 'Groomer', 'Invited', 'Pending'),
    ('user-1004', 'Mia Tan', 'mia@pawpad.local', 'Front Desk', 'Active', 'Yesterday')
ON CONFLICT (id) DO NOTHING;
