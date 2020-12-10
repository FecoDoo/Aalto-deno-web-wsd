import {
  Application,
  engineFactory,
  adapterFactory,
  viewEngine,
  Session,
} from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from "./middlewares/middlewares.js";

const session = new Session({ framework: "oak" });
await session.init();

const app = new Application();
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
);

app.use(session.use()(session));
app.use(middleware.errorMiddleware);
app.use(middleware.checkLoginStatus);
// app.use(middleware.log);
// app.use(middleware.checkCount);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
