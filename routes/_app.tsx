import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";
import { oauth2Client } from "../utils/auth.ts";

export default async function App({ Component, url }: AppProps) {
  let user = null;

  try {
    const cookies = url?.searchParams?.get("__fresh_cookie") ?? "";
    const cookieMap = new Map(cookies.split("&").map(pair => pair.split("=")));
    const sessionId = cookieMap.get("session");
    
    if (sessionId) {
      const kv = await Deno.openKv();
      const tokens = await kv.get(["session", sessionId]);
      if (tokens.value) {
        const response = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${tokens.value.accessToken}`,
          },
        });
        if (response.ok) {
          user = await response.json();
        }
      }
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SwanFactory Online</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <main>
        <Component data={{ user }} />
      </main>
      <footer className="site-footer text-sm text-gray-500">
        <p>&copy; 2025 The Swan Factory</p>
      </footer>
    </>
  );
}
