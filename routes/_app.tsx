import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main>
          <Component />
        </main>
        <footer className="site-footer">
          <p>&copy; 2025 The Swan Factory</p>
        </footer>
      </body>
    </html>
  );
}
