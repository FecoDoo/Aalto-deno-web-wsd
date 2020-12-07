import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test("GET request to /api/hello should return message", async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/hello").expect({ message: "" });
});

Deno.test("POST request to /api/hello should return '' ", async () => {
  const testClient = await superoak(app);
  await testClient.post("/api/hello").send({ message: "" }).expect(200);
});

Deno.test(
  "POST request to /api/hello with no json object should return '' ",
  async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/hello").send().expect(404);
  }
);
