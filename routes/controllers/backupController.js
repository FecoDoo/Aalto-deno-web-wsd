import {
  validate,
  required,
  isEmail,
  lengthBetween,
  maxLength,
  minLength,
} from "../../deps.js";

const loginRules = {
  email: [required, maxLength(320), isEmail],
  password: [required, lengthBetween(4, 60)],
};

const registerationRules = {
  email: [required, maxLength(320), isEmail],
  password: [required, lengthBetween(4, 60)],
  verification: [required, lengthBetween(4, 60)],
};

const postRegistrationForm = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  console.log(body);
  const [passes, errors] = await validate(document, registerationRules);
  response.status = 400;
  response.body = errors;

  if (passes) {
    if (document["verification"] == document["password"]) {
      console.log(document);
      // await authController.login();
      // const existingUsers = await executeQuery(
      //   "SELECT * FROM users WHERE email = $1",
      //   email
      // );
      // if (existingUsers.rowCount > 0) {
      //   response.body = "The email is already reserved.";
      //   return;
      // }

      // const hash = await bcrypt.hash(password);
      // await executeQuery(
      //   "INSERT INTO users (email, password) VALUES ($1, $2);",
      //   email,
      //   hash
      // );
      response.status = 200;
      response.body = "Registration successful!";
    } else {
      response.body = "Password and verification does not match";
    }
  }
};

const postLoginForm = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  console.log(body["password"]);
  const document = await body.value;
  console.log(document);
  const [passes, errors] = await validate(document, registerationRules);
  response.status = 400;
  response.body = errors;

  if (passes) {
    if (document["password"] == document["password"]) {
      console.log(document);
      response.status = 200;
      response.body = "Registration successful!";
    } else {
      response.body = "Password and verification does not match";
    }
  }
};
