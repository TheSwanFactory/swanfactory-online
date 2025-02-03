import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("basic test", () => {
  assertEquals(1 + 1, 2);
});

Deno.test("async test", async () => {
  const result = await Promise.resolve("test");
  assertEquals(result, "test");
});
