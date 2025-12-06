-- Clear all existing sample data from database
-- Run this SQL script in your PostgreSQL database to remove all sample data

-- Delete in correct order to respect foreign key constraints
DELETE FROM upvotes;
DELETE FROM issues;
DELETE FROM areas;
DELETE FROM zones;
DELETE FROM cities;
DELETE FROM users;

-- Reset sequences (optional, to start IDs from 1 again)
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE cities_id_seq RESTART WITH 1;
ALTER SEQUENCE zones_id_seq RESTART WITH 1;
ALTER SEQUENCE areas_id_seq RESTART WITH 1;
ALTER SEQUENCE issues_id_seq RESTART WITH 1;
ALTER SEQUENCE upvotes_id_seq RESTART WITH 1;

-- Verify tables are empty
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'cities', COUNT(*) FROM cities
UNION ALL
SELECT 'zones', COUNT(*) FROM zones
UNION ALL
SELECT 'areas', COUNT(*) FROM areas
UNION ALL
SELECT 'issues', COUNT(*) FROM issues
UNION ALL
SELECT 'upvotes', COUNT(*) FROM upvotes;
