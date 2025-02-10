import { assertEquals } from "jsr:@std/assert";
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
  assertEquals(one?.value.realm, user.realm);

  // delete
  await db.users.deleteByPrimaryIndex("realm", user.realm);
});
