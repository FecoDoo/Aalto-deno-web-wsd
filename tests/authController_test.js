import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test(
  "POST request to /auth/registration with password less than 4 should return 400",
  async () => {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/registration")
      .send({ email: "yao.kai@aalto.fi", password: 123 })
      .expect(400);
  }
);

Deno.test(
  "POST request to /auth/registration with invalid email should return 400",
  async () => {
    const testClient = await superoak(app);
    await testClient
      .post("/auth/registration")
      .send({ email: "yao.kai", password: "12345" })
      .expect(400);
  }
);

// Deno.test(
//   "POST request to /auth/login with password less than 4 should return 400",
//   async () => {
//     const testClient = await superoak(app);
//     await testClient
//       .post("/auth/login")
//       .send({ email: "yao.kai@aalto.fi", password: "123" })
//       .expect(400);
//   }
// );

// Deno.test(
//   "POST request to /auth/login with invalid email should return 400",
//   async () => {
//     const testClient = await superoak(app);
//     await testClient
//       .post("/auth/login")
//       .send({ email: "yao.kai", password: "1234" })
//       .expect(400);
//   }
// );

// Deno.test(
//   "POST request to /auth/login with non existent email account return 401",
//   async () => {
//     const testClient = await superoak(app);
//     await testClient
//       .post("/auth/login")
//       .send({ email: "random@random.com", password: "1234" })
//       .expect(401);
//   }
// );

// Deno.test(
//   "POST request to /auth/login with incorrect password return 400",
//   async () => {
//     const testClient = await superoak(app);
//     await testClient
//       .post("/auth/login")
//       .send({ email: "yao.kai@aalto.fi", password: "12345" })
//       .expect(400);
//   }
// );
