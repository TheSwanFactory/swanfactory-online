import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";

export async function handler(req: Request) {
  const cookies = getCookies(req.headers);
  const sessionId = cookies["session"];
  if (sessionId) {
    const kv = await Deno.openKv();
    await kv.delete(["session", sessionId]);
  }

  const headers = new Headers();
  headers.set("location", "/");
  headers.set(
    "set-cookie",
    `session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  );

  return new Response(null, {
    status: 302,
    headers,
  });
}
