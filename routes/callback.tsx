import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "https://deno.land/x/kv_oauth@v0.10.0/mod.ts";

export const handler: Handlers = {
  async GET(req) {
    return await handleCallback(req);
  },
};

export default function Callback() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <p>Processing login...</p>
    </div>
  );
}
