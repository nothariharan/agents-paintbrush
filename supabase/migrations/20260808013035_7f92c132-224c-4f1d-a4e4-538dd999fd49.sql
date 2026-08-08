REVOKE ALL ON FUNCTION public.get_site_stats() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.bump_counter(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_site_stats() TO service_role;
GRANT EXECUTE ON FUNCTION public.bump_counter(text) TO service_role;