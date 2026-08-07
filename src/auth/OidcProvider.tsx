import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider, type AuthProviderProps } from "react-oidc-context";

// A thin wrapper so onSigninCallback can use react-router's useNavigate —
// AuthProvider itself has no router awareness, it just needs somewhere to
// send you once the code exchange (which it runs internally) resolves.
export function OidcProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const oidcConfig: AuthProviderProps = {
    authority: "http://localhost:9000",
    client_id: "demo-client",
    redirect_uri: "http://localhost:9700/callback",
    post_logout_redirect_uri: "http://localhost:9700",
    scope: "openid profile",
    automaticSilentRenew: false, // library pass task #12 turns this on

    // Runs once, after AuthProvider's internal signinRedirectCallback()
    // succeeds. Compare to our hand-rolled Callback.tsx, which called
    // signinRedirectCallback() itself and navigated in its own .then() —
    // here that call happens inside the library, invisibly, as soon as
    // AuthProvider mounts and sees code/state in the URL.
    //
    // `user.state` is whatever Home.tsx passed into signinRedirect({ state })
    // — the page ProtectedRoute originally redirected from. Falls back to
    // "/" for the plain "clicked Log in from Home" case, where there's no
    // original destination to return to.
    onSigninCallback: (user) => {
      const returnTo = typeof user?.state === "string" ? user.state : "/";
      navigate(returnTo, { replace: true });
    },
  };

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
