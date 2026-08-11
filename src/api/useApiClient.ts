import { useAuth } from "react-oidc-context";

// No protected resource server exists in this project yet — this is the
// placeholder pattern PROJECT_PLAN.md calls for: a fetch wrapper that
// attaches the current access_token as a Bearer header, ready for whenever
// there's a real API to call. Returned as a function (not called directly
// from module scope) because it needs the current access_token at call
// time, which only useAuth() can provide, and that's a hook.
export function useApiClient() {
  const auth = useAuth();

  return async function authorizedFetch(
    input: RequestInfo | URL,
    init: RequestInit = {},
  ): Promise<Response> {
    const headers = new Headers(init.headers);
    if (auth.user?.access_token) {
      headers.set("Authorization", `Bearer ${auth.user.access_token}`);
    }
    return fetch(input, { ...init, headers });
  };
}
