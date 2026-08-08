CREATE TABLE public.waitlist_signups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.waitlist_signups TO anon, authenticated;
GRANT ALL ON public.waitlist_signups TO service_role;
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
ON public.waitlist_signups FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (note IS NULL OR char_length(note) <= 500)
);

CREATE TABLE public.site_counters (
  name text NOT NULL PRIMARY KEY,
  value bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_counters TO anon, authenticated;
GRANT ALL ON public.site_counters TO service_role;
ALTER TABLE public.site_counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Counters are public"
ON public.site_counters FOR SELECT TO anon, authenticated
USING (true);

INSERT INTO public.site_counters (name, value) VALUES ('github_clicks', 0);

CREATE OR REPLACE FUNCTION public.get_site_stats()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'waitlist_count', (SELECT count(*) FROM public.waitlist_signups),
    'github_clicks', COALESCE((SELECT value FROM public.site_counters WHERE name = 'github_clicks'), 0)
  );
$$;

GRANT EXECUTE ON FUNCTION public.get_site_stats() TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.bump_counter(counter_name text)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_value bigint;
BEGIN
  INSERT INTO public.site_counters (name, value, updated_at)
  VALUES (counter_name, 1, now())
  ON CONFLICT (name) DO UPDATE
    SET value = public.site_counters.value + 1, updated_at = now()
  RETURNING value INTO new_value;
  RETURN new_value;
END;
$$;

GRANT EXECUTE ON FUNCTION public.bump_counter(text) TO anon, authenticated, service_role;