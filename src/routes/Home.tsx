import { useAuth } from "react-oidc-context";

function Home() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <p>Loading…</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>oidc-auth-server demo client</h1>
      {auth.isAuthenticated ? (
        <p>Logged in as {auth.user?.profile.sub}</p>
      ) : (
        <button onClick={() => auth.signinRedirect()}>Log in</button>
      )}
    </div>
  );
}

export default Home;
