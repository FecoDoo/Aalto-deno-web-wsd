import { Application, Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://raw.githubusercontent.com/deligenius/view-engine/master/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.4.5/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";

const app = new Application();
const router = new Router();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine));

const client = new Client({
  hostname: "localhost",
  database: "wsd",
  user: "postgres",
  password: "postgres",
  port: 5432,
});

app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
});

const executeQuery = async (query, ...args) => {
  try {
    await client.connect();
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
};

const form = ({ render }) => {
  render("index.ejs");
};

const processUpload = async ({ request, response }) => {
  const body = request.body();
  const reader = await body.value;
  const data = await reader.read();
  const file = data.files[0];
  console.log(file);
  const fileContents = await Deno.readAll(await Deno.open(file.filename));
  const pw = `${Math.floor(100000 * Math.random())}`;
  await executeQuery(
    "INSERT INTO stored_files (name, type, password, length, data) VALUES ($1, $2, $3, $4, $5);",
    file.originalName,
    file.contentType,
    await bcrypt.hash(pw),
    fileContents.length,
    base64.fromUint8Array(fileContents)
  );

  response.status = 200;
  response.body = pw;
};

const getFile = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;
  if (params.has("password") && params.has("id")) {
    const password = params.get("password");
    const id = params.get("id");
    const res = await executeQuery(
      "SELECT * FROM stored_files WHERE id = $1",
      id
    );
    if (res && res.rowsOfObjects().length > 0) {
      const obj = res.rowsOfObjects()[0];
      const hashed = obj.password;
      if (await bcrypt.compare(password, hashed)) {
        response.headers.set("Content-Type", obj.type);
        response.headers.set("Content-Length", obj.length);
        response.body = base64.toUint8Array(obj.data);
        return;
      } else {
        response.status = 401;
        response.body = "password incorrect!";
        return;
      }
    } else {
      response.status = 401;
      response.body = "No such file!";
      return;
    }
  } else {
    response.status = 400;
    response.body = "form incorrect!";
    return;
  }
};

router.get("/", form);
router.post("/", processUpload);
router.post("/files", getFile);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}
export default app;
