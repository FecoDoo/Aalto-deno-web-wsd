import * as middlewares from "../middlewares/middlewares.js";
import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test({
  name: "errorMiddleware",
  async fn() {
    const fun = () => {};
    const fun2 = () => {
      throw Error("hello!");
    };
    await middlewares.errorMiddleware(fun, fun);
    await middlewares.errorMiddleware(fun, fun2);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "access page with no authentication",
  async fn() {
    const testClient = await superoak(app);
    let res = await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "serveStaticFilesMiddleware",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/static").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "serveStaticFilesMiddleware with files",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/static/test.txt").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
