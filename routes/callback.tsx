import { HandlerContext } from "$fresh/server.ts";
import { oauth2Client } from "../utils/auth.ts";

export async function handler(req: Request, ctx: HandlerContext) {
  const tokens = await oauth2Client.code.getToken(req.url);
  const headers = new Headers();
  const sessionId = crypto.randomUUID();
  
  const kv = await Deno.openKv();
  await kv.set(["session", sessionId], tokens);
  headers.set("location", "/");
  headers.set(
    "set-cookie",
    `session=${sessionId}; Path=/; HttpOnly; SameSite=Lax`,
  );

  return new Response(null, {
    status: 302,
    headers,
  });
}

export default function Callback() {
  return <div>Processing login...</div>;
}
