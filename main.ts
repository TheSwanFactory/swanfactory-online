import { serveDir } from "@std/http";

const userPagePattern = new URLPattern({ pathname: "/users/:id" });
const staticPathPattern = new URLPattern({ pathname: "/static/*" });

async function pageResponse(title: string, page: string): Promise<Response> {
  const template = await Deno.readTextFile("static/template.html");
  const content = await Deno.readTextFile(`static/${page}.html`);
  const rendered = template
  .replaceAll("{{title}}", title)
  .replace("{{content}}", content);
  return new Response(rendered, {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });

}

export default {
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
        return await pageResponse("Home Page", "index");
    }

    const userPageMatch = userPagePattern.exec(url);
    if (userPageMatch) {
      return new Response(userPageMatch.pathname.groups.id);
    }

    if (staticPathPattern.test(url)) {
      return serveDir(req);
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies Deno.ServeDefaultExport;
