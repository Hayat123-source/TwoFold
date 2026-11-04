/*
# Create early-access signups table

1. New Tables
- `early_access_signups`
  - `id` (uuid, primary key)
  - `first_name` (text, required, 1-60 characters)
  - `email` (text, required, unique regardless of letter case)
  - `phone` (text, required, 7-20 characters of digits and phone symbols)
  - `date_of_birth` (date, required)
  - `city` (text, required, 1-100 characters)
  - `age_confirmed` (boolean, must be true)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Row level security is enabled.
- The public (anon and signed-in roles) can only INSERT a signup. They cannot read, update or delete any signups, so other visitors' personal details are never exposed.
- The insert policy rejects any signup where the age confirmation is missing or the date of birth shows the person is under 18.

3. Important Notes
- No data is modified or removed on existing tables; this migration only creates a new table.
- Duplicate emails are rejected by a unique index, so the same person cannot join the waitlist twice.
*/

CREATE TABLE IF NOT EXISTS early_access_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL CHECK (char_length(trim(first_name)) BETWEEN 1 AND 60),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254 AND email LIKE '%_@_%._%'),
  phone text NOT NULL CHECK (phone ~ '^\+?[0-9 ()-]{7,20}$'),
  date_of_birth date NOT NULL,
  city text NOT NULL CHECK (char_length(trim(city)) BETWEEN 1 AND 100),
  age_confirmed boolean NOT NULL CHECK (age_confirmed = true),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS early_access_signups_email_key
  ON early_access_signups (lower(email));

ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON early_access_signups TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_early_access_signups" ON early_access_signups;
CREATE POLICY "anon_insert_early_access_signups" ON early_access_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    age_confirmed = true
    AND date_of_birth <= (current_date - interval '18 years')
  );
