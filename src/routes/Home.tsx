import { Link, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";

function Home() {
  const auth = useAuth();
  const location = useLocation();
  // Set by ProtectedRoute when it redirected here because an unauthenticated
  // user tried to reach a protected page. Not to be confused with the OIDC
  // `state` param below, which is a different mechanism for the same idea.
  const from = (location.state as { from?: string } | null)?.from;

  if (auth.isLoading) {
    return <p>Loading…</p>;
  }

  const handleLogin = () => {
    // Round-trips `from` through the server via OIDC's own `state` param:
    // it comes back attached to the resolved User after the exchange, and
    // OidcProvider's onSigninCallback reads it to navigate back here.
    auth.signinRedirect(from ? { state: from } : undefined);
  };

  // signoutRedirect() isn't usable here: it requires the discovery doc's
  // end_session_endpoint (oidc-client-ts throws "No end session endpoint"
  // otherwise), and this server doesn't implement RP-Initiated Logout.
  // removeUser() is the local-only equivalent: it clears the stored user
  // from sessionStorage and fires addUserUnloaded, no server round-trip.
  // That's also correct for this server's session model: the Spring
  // Security login session cookie is separate from the OIDC tokens and is
  // left untouched, so a subsequent "Log in" click will silently reuse it
  // rather than showing the login form again, same behavior already seen
  // in earlier manual logins during this project.
  const handleLogout = () => {
    auth.removeUser();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>oidc-auth-server demo client</h1>
      {auth.isAuthenticated ? (
        <>
          <p>Logged in as {auth.user?.profile.sub}</p>
          <Link to="/profile">View profile</Link>
          <p>
            <button onClick={handleLogout}>Log out</button>
          </p>
        </>
      ) : (
        <button onClick={handleLogin}>Log in</button>
      )}
    </div>
  );
}

export default Home;
