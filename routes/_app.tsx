import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";
import { oauth2Client } from "../utils/auth.ts";

export default function App({ Component, url }: AppProps) {
  const cookies = getCookies(new Headers({
    cookie: url?.searchParams?.get("__fresh_cookie") ?? "",
  }));
  
  const data = {
    sessionId: cookies["session"] || null,
    user: null // We'll handle user data in the component
  };

  return (
    <html>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SwanFactory Online</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <body>
        <main>
          <Component data={{ user, sessionId }} />
        </main>
        <footer className="site-footer text-sm text-gray-500">
          <p>&copy; 2025 The Swan Factory</p>
        </footer>
      </body>
    </html>
  );
}
