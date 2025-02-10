// server.ts
import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

const oauthConfig = createGitHubOAuthConfig();
const {
  signIn,
  handleCallback,
  getSessionId,
  signOut,
} = createHelpers(oauthConfig);

async function handler(request: Request) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case "/oauth/signin":
      return await signIn(request);
    case "/oauth/callback": {
      const { response } = await handleCallback(request);
      return response;
    }
    case "/oauth/signout":
      return await signOut(request);
    case "/protected-route":
      return await getSessionId(request) === undefined
        ? new Response("Unauthorized", { status: 401 })
        : new Response("You are allowed");
    default:
      return new Response(null, { status: 404 });
  }
}

Deno.serve(handler);
