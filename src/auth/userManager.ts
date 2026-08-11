import { UserManager, WebStorageStateStore } from "oidc-client-ts";

// `authority` is the issuer, and oidc-client-ts fetches
// http://localhost:9000/.well-known/openid-configuration on first use
// and caches the discovery document (authorize/token endpoints, jwks_uri,
// etc). This is why you don't hardcode /authorize or /token here at all;
// the library reads them from your server's discovery doc.
export const userManager = new UserManager({
  authority: "http://localhost:9000",
  client_id: "demo-client",
  redirect_uri: "http://localhost:9700/callback",
  post_logout_redirect_uri: "http://localhost:9700",
  response_type: "code", // Authorization Code flow
  scope: "openid profile",



  // No client_secret field exists in this config at all: this is what
  // "public client" means in practice. There is nothing to leak because
  // there is nothing secret to configure.

  // Where oidc-client-ts stores the code_verifier, state, and nonce
  // between the /authorize redirect and the /callback return trip.
  // sessionStorage survives the full-page navigation but is scoped to
  // this tab, unlike localStorage which would leak across tabs.
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),

  automaticSilentRenew: false, // we'll turn this on once refresh is wired up
});
