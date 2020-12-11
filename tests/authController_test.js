import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test({
  name:
    "POST request to /auth/registration with invalid email should return 400",
  fn: async () => {
    const testClient = await superoak(app);
    let res = await testClient
      .post("/auth/registration")
      .send({ email: "yao.kai", password: "12345" })
      .expect(400);
    console.log(res);
  },
});

Deno.test(
  "POST request to /auth/registration with password less than 4 should return 400",
  async () => {
    const testClient = await superoak(app);
    const data = { email: "yao.kai@aalto.fi", password: 123 };
    let res = await testClient
      .post("/auth/registration")
      .send(data)
      .expect(400);
    console.log(res);
  }
);
