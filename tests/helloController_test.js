import { app } from "../../app.js";
import { superoak } from "../../deps.js";

Deno.test("serveStaticFilesMiddleware", async () => {
  const testClient = await superoak(app);
  await testClient.get("/").expect("");
});
