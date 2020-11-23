import {
  Application,
  engineFactory,
  adapterFactory,
  viewEngine,
} from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from "./middlewares/middlewares.js";

const app = new Application();
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
);
app.use(middleware.errorMiddleware);
app.use(middleware.log);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
