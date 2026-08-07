import { useAuth } from "react-oidc-context";

// Compare to the hand-rolled version: there's no useEffect here at all.
// AuthProvider (in OidcProvider.tsx) already ran signinRedirectCallback()
// itself, the moment it mounted and saw code/state in the URL — before
// this component even rendered. This component just reflects whatever
// state that produced. On success, onSigninCallback (configured on
// AuthProvider) already navigated away to "/", so this rarely stays on
// screen long enough to see. On failure, it won't navigate, and auth.error
// is what's left for us to show.
function Callback() {
  const auth = useAuth();

  if (auth.error) {
    return <p>Sign-in failed: {auth.error.message}</p>;
  }

  return <p>Completing sign-in…</p>;
}

export default Callback;
