import { Handlers } from "$fresh/server.ts";
import { oauth2Client } from "../utils/auth.ts";
import { signIn } from "https://deno.land/x/kv_oauth@v0.10.0/mod.ts";

export const handler: Handlers = {
  async GET(req) {
    return await signIn(req);
  },
};

export default function LoginPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="mb-4">Redirecting to GitHub login...</p>
    </div>
  );
}
