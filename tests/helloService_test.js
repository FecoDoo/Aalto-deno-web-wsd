import { getHello, setHello } from "./helloService.js";
import { assertEquals } from "../deps.js";

Deno.test("getHello should return message", async () => {
  assertEquals(getHello(), "");
});

Deno.test("calling setHello with no message input", async () => {
  assertEquals(setHello(), undefined);
});

Deno.test("calling setHello with longer message input than 10", async () => {
  assertEquals(setHello("1234567891"), undefined);
});

Deno.test("calling setHello with valid message input", async () => {
  assertEquals(setHello("message"), undefined);
});
