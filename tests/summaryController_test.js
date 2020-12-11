import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test({
  name: "POST request /behavior/summary with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      week: "2020-12",
      month: "2020-10",
    };
    await testClient.post("/behavior/summary").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "POST request /behavior/summary with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      week: "2020-W12",
      month: "2020-110",
    };
    await testClient.post("/behavior/summary").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
