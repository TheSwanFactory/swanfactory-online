import { HandlerContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: HandlerContext) {
  const sessionCookie = ctx.state.cookies?.session;
  if (sessionCookie) {
    await ctx.state.kv.delete(["session", sessionCookie]);
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
