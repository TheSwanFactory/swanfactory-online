import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { oauth2Client } from "../utils/auth.ts";

export default async function App(props: AppProps) {
  const { Component } = props;
  let user = null;

  // Get session from cookie
  const sessionCookie = props.state.cookies?.session;
  if (sessionCookie) {
    try {
      const tokens = await props.state.kv.get(["session", sessionCookie]);
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
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

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
          <Component {...props} data={{ user }} />
        </main>
        <footer className="site-footer text-sm text-gray-500">
          <p>&copy; 2025 The Swan Factory</p>
        </footer>
      </body>
    </html>
  );
}
