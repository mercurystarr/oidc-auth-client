import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return <p>Loading…</p>;
  }

  if (!auth.isAuthenticated) {
    // Stash where we were trying to go as React Router location state
    // (separate from OIDC's own `state` param below) so Home's login
    // button can read it and pass it through to signinRedirect.
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}
