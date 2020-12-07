import * as middlewares from "./middlewares.js";
import { superoak } from "../deps.js";
import { router } from "../routes/routes.js";
import { app } from "../app.js";

Deno.test("errorMiddleware", async () => {
  const fun = () => {};
  const fun2 = () => {
    throw Error("hello!");
  };
  await middlewares.errorMiddleware(fun, fun);
  await middlewares.errorMiddleware(fun, fun2);
});

Deno.test("requestTimingMiddleware", async () => {
  const context = { request: { method: "POST", url: { pathname: "/api" } } };
  const fun = () => {
    return true;
  };
  await middlewares.requestTimingMiddleware(context, fun);
});

Deno.test("serveStaticFilesMiddleware", async () => {
  const testClient = await superoak(app);
  await testClient.get("/static").expect(404);
});
