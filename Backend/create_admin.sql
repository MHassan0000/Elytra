-- Create Admin User
-- Username: admin
-- Password: Admin@123
-- This script creates a new admin user that won't appear in the users list

INSERT INTO users (username, email, password, role, provider, created_at, updated_at)
VALUES (
    'admin',
    'admin@elytra.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'ADMIN',
    'LOCAL',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    password = EXCLUDED.password,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP;
