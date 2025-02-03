import { createGitHubOAuth2Client } from "https://deno.land/x/deno_kv_oauth@v0.10.0/mod.ts";

export const oauth2Client = createGitHubOAuth2Client({
  clientId: Deno.env.get("GITHUB_CLIENT_ID") || "",
  clientSecret: Deno.env.get("GITHUB_CLIENT_SECRET") || "",
  redirectUri: "http://localhost:8000/callback",
});
