import { assertEquals, assertNotEquals } from "jsr:@std/assert";
import { db, User } from "./models.ts";

// Test UserModel

Deno.test("Upsert User into db", async () => {
  const user: User = {
    realm: "test.user",
  };

  const result = await db.users.upsertByPrimaryIndex({
    index: ["realm", user.realm],
    update: user,
    set: user,
  });
  console.log(result);
  assertEquals(result.ok, true);

  // getOne
  const one = await db.users.getOne();
  console.log(one);
  assertNotEquals(one, null);
  assertEquals(one?.value.realm, user.realm);

  const user_id = one?.id;
  if (user_id !== undefined) {
    await db.users.delete(user_id);
  } else {
    throw new Error("user_id is undefined");
  }
});
