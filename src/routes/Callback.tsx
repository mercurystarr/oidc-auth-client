import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "../auth/userManager";

function Callback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // signinRedirectCallback() consumes the stored code_verifier/state —
  // calling it twice throws "no matching state". StrictMode double-invokes
  // effects in dev specifically to catch side effects like this, so guard
  // with a ref (not state — we don't want the guard itself to re-render).
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    userManager
      .signinRedirectCallback()
      .then(() => {
        // Step 3/4 (AuthContext + ProtectedRoute) will redirect back to
        // whatever page originally triggered the login, via signinRedirect's
        // `state` option. For now, everything funnels back to "/".
        navigate("/", { replace: true });
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      });
  }, [navigate]);

  if (error) {
    // Step 8 will build this out into a proper error UI (distinguishing
    // e.g. user-cancelled vs PKCE mismatch). This is just a safety net for
    // now so a failure doesn't hang on "Completing sign-in..." forever.
    return <p>Sign-in failed: {error}</p>;
  }

  return <p>Completing sign-in…</p>;
}

export default Callback;
