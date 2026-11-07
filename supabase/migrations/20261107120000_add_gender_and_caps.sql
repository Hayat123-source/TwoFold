/*
# Gender + 500/500 cap

1. Adds `gender` column ('male' | 'female') to early_access_signups.
2. Insert policy now requires gender.
3. Trigger blocks a signup when that gender already has 500 people (race-safe via advisory lock).
4. Public function get_spots() returns only the counts (no personal data) so the site can show the live counter.
*/

ALTER TABLE early_access_signups
  ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('male', 'female'));

DROP POLICY IF EXISTS "anon_insert_early_access_signups" ON early_access_signups;
CREATE POLICY "anon_insert_early_access_signups" ON early_access_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    age_confirmed = true
    AND gender IS NOT NULL
    AND date_of_birth <= (current_date - interval '18 years')
  );

CREATE OR REPLACE FUNCTION enforce_gender_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  taken integer;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('early_access_gender_cap'));
  SELECT count(*) INTO taken FROM early_access_signups WHERE gender = NEW.gender;
  IF taken >= 500 THEN
    RAISE EXCEPTION 'GENDER_FULL';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS early_access_gender_cap ON early_access_signups;
CREATE TRIGGER early_access_gender_cap
  BEFORE INSERT ON early_access_signups
  FOR EACH ROW EXECUTE FUNCTION enforce_gender_cap();

CREATE OR REPLACE FUNCTION get_spots()
RETURNS json
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'male',   count(*) FILTER (WHERE gender = 'male'),
    'female', count(*) FILTER (WHERE gender = 'female')
  ) FROM early_access_signups;
$$;

GRANT EXECUTE ON FUNCTION get_spots() TO anon, authenticated;
