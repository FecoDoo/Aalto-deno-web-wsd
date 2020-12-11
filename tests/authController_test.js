import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test({
  name: "POST request  /auth/registration with empty form should return 400",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/registration").send({}).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "POST request  /auth/registration with invalid email should return 400",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/registration")
      .send({ email: "yao.kai", password: "12345", verification: "12345" })
      .expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request  /auth/registration with password less than 4 should return 400",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/registration")
      .send({
        email: "yao.kai@aalto.fi",
        password: "123",
        verification: "123",
      })
      .expect(400)
      .expect("Invalid email or password");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request  /auth/registration with verification and password no match should return 400",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/registration")
      .send({
        email: "yao.kai@aalto.fi",
        password: "123",
        verification: "12345",
      })
      .expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request  /auth/registration with existing email should return 401",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/registration")
      .send({
        email: "yao.kai@aalto.fi",
        password: "12345",
        verification: "12345",
      })
      .expect(401);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
// login

Deno.test({
  name: "POST request  /auth/login with non-existing email should return 401",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/login")
      .send({
        email: "random@aalto.fi",
        password: "12345",
        verification: "12345",
      })
      .expect(401)
      .expect("User not found");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "POST request  /auth/login with invalid email should return 400",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/login")
      .send({
        email: "random",
        password: "12345",
        verification: "12345",
      })
      .expect(400)
      .expect("Invalid email or password");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "POST request  /auth/login with invalid password should return 400",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/login")
      .send({
        email: "yao.kai@aalto.fi",
        password: "123",
        verification: "123",
      })
      .expect(400)
      .expect("Invalid email or password");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "POST request  /auth/login with incorrect password should return 401",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/login")
      .send({
        email: "yao.kai@aalto.fi",
        password: "123456",
        verification: "123456",
      })
      .expect(401)
      .expect("Password incorrect");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "POST request  /auth/login with correct password should return 401",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/login")
      .send({
        email: "yao.kai@aalto.fi",
        password: "12345",
        verification: "12345",
      })
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
// logout
Deno.test({
  name: "POST request  /auth/logout  should return 401",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/logout").send({}).expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
