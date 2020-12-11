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

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}
app.listen({ port: port });

// export default app;
export { app };
