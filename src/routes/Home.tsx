import { userManager } from "../auth/userManager";

function Home() {
  const handleLogin = () => {
    userManager.signinRedirect();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>oidc-auth-server demo client</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default Home;