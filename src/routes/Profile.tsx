import { useAuth } from "react-oidc-context";

function Profile() {
  const auth = useAuth();

  return (
    <div style={{ padding: 40 }}>
      <h1>Profile</h1>
      <pre>{JSON.stringify(auth.user?.profile, null, 2)}</pre>
    </div>
  );
}

export default Profile;
