import { Application, Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { Session } from "https://deno.land/x/session@v1.0.0/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.4.5/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://raw.githubusercontent.com/deligenius/view-engine/master/mod.ts";

import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const app = new Application();
const router = new Router();

const session = new Session({ framework: "oak" });
await session.init();
app.use(session.use()(session));

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine));

// const client = new Client({
//   hostname: "localhost",
//   database: "wsd",
//   user: "postgres",
//   password: "postgres",
//   port: 5432,
// });

const client = new Client({});

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

app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
});

app.use(async ({ request, response, session }, next) => {
  if (!request.url.pathname.startsWith("/auth")) {
    if (session && (await session.get("authenticated"))) {
      await next();
    } else {
      response.status = 401;
    }
  } else {
    await next();
  }
});

const showRegistrationForm = ({ render }) => {
  render("register.ejs");
};

const postRegistrationForm = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;
  if (
    params.has("email") &&
    params.has("password") &&
    params.has("verification")
  ) {
    const email = params.get("email");
    const password = params.get("password");
    const verification = params.get("verification");
    console.log(email);
    console.log(password);
    if (!email || !password || !verification) {
      response.status = 400;
      return;
    }
    if (password !== verification) {
      response.body = "The entered passwords did not match";
      return;
    }

    const existingUsers = await executeQuery(
      "SELECT * FROM users WHERE email = $1",
      email
    );
    if (existingUsers.rowCount > 0) {
      response.body = "The email is already reserved.";
      return;
    }

    const hash = await bcrypt.hash(password);
    await executeQuery(
      "INSERT INTO users (email, password) VALUES ($1, $2);",
      email,
      hash
    );
    response.body = "Registration successful!";
  } else {
    response.body = "Registration form is not complete!";
  }
};

const showLoginForm = ({ render }) => {
  render("login.ejs");
};

const postLoginForm = async ({ request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");
  if (!email || !password) {
    response.status = 400;
    return;
  }
  // check if the email exists in the database
  const res = await executeQuery(
    "SELECT * FROM users WHERE email = $1;",
    email
  );
  if (res.rowCount === 0) {
    response.status = 401;
    return;
  }

  // take the first row from the results
  const userObj = res.rowsOfObjects()[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    response.status = 401;
    return;
  }

  await session.set("authenticated", true);
  await session.set("user", {
    id: userObj.id,
    email: userObj.email,
  });
  response.body = "Authentication successful!";
};

const showMyAccounts = async ({ render, session }) => {
  const user = await session.get("user");
  const res = await executeQuery(
    "SELECT * FROM accounts WHERE user_id = $1",
    user.id
  );
  render("accounts.ejs", { accounts: res.rowsOfObjects() });
};

const addAccount = async ({ request, response, session }) => {
  const body = request.body();
  const params = await body.value;

  if (params.has("name")) {
    const name = params.get("name");
    const user = await session.get("user");
    const user_id = user.id;
    await executeQuery(
      "INSERT INTO accounts (name, user_id) VALUES ($1,$2);",
      name,
      user_id
    );
    response.status = 200;
  } else {
    response.status = 400;
  }
};

const deposit = async ({ request, response, session }) => {
  const body = request.body();
  const params = await body.value;
  console.log("deposit");
  if (
    !params.has("amount") ||
    Number(params.get("amount")).toString() !== params.get("amount") ||
    Number(params.get("amount") < 0)
  ) {
    response.status = 400;
    return;
  } else {
    const user = await session.get("user");
    const id = request.url.pathname.split("/")[2];
    const amount = Number(params.get("amount"));
    const res = await executeQuery(
      "SELECT balance FROM accounts WHERE user_id = $1 AND id = $2;",
      user.id,
      id
    );

    if (res.rowsOfObjects().length > 0 && res) {
      const cur_balance = Number(res.rowsOfObjects()[0].balance);
      await executeQuery(
        "UPDATE accounts SET balance = $1 WHERE id = $2 AND user_id = $3;",
        amount + cur_balance,
        id,
        user.id
      );
      response.status = 200;
      return;
    } else {
      response.status = 401;
      return;
    }
  }
};

const withdraw = async ({ request, response, session }) => {
  const body = request.body();
  const params = await body.value;
  if (
    !params.has("amount") ||
    Number(params.get("amount")).toString() !== params.get("amount") ||
    Number(params.get("amount") < 0)
  ) {
    response.status = 400;
    return;
  } else {
    const user = await session.get("user");
    const id = request.url.pathname.split("/")[2];
    const amount = Number(params.get("amount"));
    const res = await executeQuery(
      "SELECT balance FROM accounts WHERE user_id = $1 AND id = $2;",
      user.id,
      id
    );
    if (res && res.rowsOfObjects().length > 0) {
      const cur_balance = Number(res.rowsOfObjects()[0].balance);
      if (cur_balance >= amount) {
        await executeQuery(
          "UPDATE accounts SET balance = $1 WHERE id = $2 AND user_id = $3;",
          Number(cur_balance) - amount,
          id,
          user.id
        );
        response.status = 200;
        return;
      } else {
        response.status = 401;
        return;
      }
    } else {
      response.status = 401;
      return;
    }
  }
};

const transfer = async ({ request, response, session }) => {
  const body = request.body();
  const params = await body.value;
  if (
    !params.has("amount") ||
    Number(params.get("amount")).toString() !== params.get("amount")
  ) {
    response.status = 400;
    return;
  } else if (Number(params.get("amount") < 0)) {
    response.status = 401;
    return;
  } else {
    const amount = Number(params.get("amount"));

    const tmp = request.url.pathname.split("/");
    const fromId = tmp[3];
    const toId = tmp[4];

    const user = await session.get("user");
    console.log(fromId);
    console.log(user.id);
    let res = await executeQuery(
      "SELECT * FROM accounts WHERE id=$1 AND user_id = $2;",
      fromId,
      user.id
    );
    console.log(1);
    console.log(res.rowsOfObjects());
    if (res && res.rowsOfObjects().length > 0) {
      const from_cur_balance = Number(res.rowsOfObjects()[0].balance);
      console.log(2);
      if (from_cur_balance >= amount) {
        console.log(3);
        res = await executeQuery("SELECT * FROM accounts WHERE id = $1;", toId);
        console.log(res.rowsOfObjects());
        if (res && res.rowsOfObjects().length > 0) {
          console.log(4);
          const to_cur_balance = Number(res.rowsOfObjects()[0].balance);

          await executeQuery(
            "UPDATE accounts SET balance = $1 WHERE id = $2",
            to_cur_balance + amount,
            toId
          );
          await executeQuery(
            "UPDATE accounts SET balance = $1 WHERE id = $2",
            from_cur_balance - amount,
            fromId
          );
          response.status = 200;
          return;
        } else {
          response.status = 400;
          response.body = "Destination account does not exist!";
          return;
        }
      } else {
        response.status = 401;
        return;
      }
    } else {
      response.status = 401;
      return;
    }
  }
};

// const checkAccountExist = (id) => {
//   const res = await executeQuery("SELECT * from accounts WHERE id = $1;", id);
//   if (res && res.rowsOfObjects().length >0){
//     return res.rowsOfObjects();
//   } else {
//     return false;
//   }
// }
router.get("/", showLoginForm);
router.get("/auth/login", showLoginForm);
router.post("/auth/login", postLoginForm);
router.get("/auth/register", showRegistrationForm);
router.post("/auth/register", postRegistrationForm);

router.get("/accounts", showMyAccounts);
router.post("/accounts", addAccount);
router.post("/accounts/:id/deposit", deposit);
router.post("/accounts/:id/withdraw", withdraw);

router.post("/accounts/transfer/:fromId/:toId", transfer);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
