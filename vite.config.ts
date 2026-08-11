import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The oidc-auth-server's demo client is pre-registered with
// redirect_uri=http://localhost:9700/callback, so the dev server
// has to run on 9700, not Vite's default 5173, or the redirect
// won't match and /authorize will reject it.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9700,
  },
})
