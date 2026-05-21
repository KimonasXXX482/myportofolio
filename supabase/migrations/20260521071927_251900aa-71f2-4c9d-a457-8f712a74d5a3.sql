
-- Revoke execute on has_role from public/anon; keep for authenticated (needed by RLS policies)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Replace permissive INSERT policy on feedbacks with validation
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedbacks;

CREATE POLICY "Anyone can submit valid feedback"
ON public.feedbacks
FOR INSERT
TO public
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 80
  AND rating BETWEEN 1 AND 5
  AND length(btrim(comment)) BETWEEN 1 AND 1000
);
