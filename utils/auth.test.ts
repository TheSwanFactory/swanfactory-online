import { assertNotEquals } from "jsr:@std/assert";
import { oauth2Client } from "./auth.ts";

Deno.test("OAuth2Client is initialized", () => {
  assertNotEquals(oauth2Client.clientCredentials.getToken, undefined);
});
