import { Link, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";

function Home() {
  const auth = useAuth();
  const location = useLocation();
  // Set by ProtectedRoute when it redirected here because an unauthenticated
  // user tried to reach a protected page — not to be confused with the OIDC
  // `state` param below, which is a different mechanism for the same idea.
  const from = (location.state as { from?: string } | null)?.from;

  if (auth.isLoading) {
    return <p>Loading…</p>;
  }

  const handleLogin = () => {
    // Round-trips `from` through the server via OIDC's own `state` param —
    // it comes back attached to the resolved User after the exchange, and
    // OidcProvider's onSigninCallback reads it to navigate back here.
    auth.signinRedirect(from ? { state: from } : undefined);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>oidc-auth-server demo client</h1>
      {auth.isAuthenticated ? (
        <>
          <p>Logged in as {auth.user?.profile.sub}</p>
          <Link to="/profile">View profile</Link>
        </>
      ) : (
        <button onClick={handleLogin}>Log in</button>
      )}
    </div>
  );
}

export default Home;
