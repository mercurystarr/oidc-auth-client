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

    // Checked oidc-client-ts's source rather than assume: signinSilent()
    // (which this triggers internally on the accessTokenExpiring event,
    // ~60s before expiry by default) checks `user.refresh_token` first and
    // uses the refresh token grant directly if one exists — it only falls
    // back to an iframe + `prompt=none` request when there's no refresh
    // token. This server always issues one, so the iframe path (which the
    // server has no support for) never gets hit. Rotation is also handled
    // correctly: each renewal's response overwrites the stored user, so
    // the next renewal picks up the newly-rotated refresh_token rather
    // than reusing a stale one.
    automaticSilentRenew: true,

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
