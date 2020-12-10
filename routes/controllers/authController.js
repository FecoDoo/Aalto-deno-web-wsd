import { executeQuery } from "../../database/database.js";
import { bcrypt } from "../../deps.js";
import * as commonService from "../../services/commonService.js";
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
const postTestForm = async ({ request, response }) => {
  console.log("test");
  const body = request.body({ type: "json" });
  console.log(body);
  const document = await body.value;
  console.log(document);
  response.status = 200;
};

const postLoginForm = async ({ request, response, session }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const [passes, errors] = await validate(document, loginRules);

  if (passes) {
    const email = document["email"];
    const password = document["password"];
    const user = await commonService.get_user_by_email(email);

    if (user.rowCount === 0) {
      response.status = 401;
      response.body = "User not found";
      return;
    }

    const userObj = user.rowsOfObjects()[0];
    const hashed_password = userObj.password;
    const compare_password = await bcrypt.compare(password, hashed_password);
    if (!compare_password) {
      response.status = 401;
      response.body = "Password incorrect";
      return;
    }

    await session.set("authenticated", true);
    await session.set("user", {
      id: userObj.id,
      email: userObj.email,
    });
    response.status = 200;
    return;
  } else {
    response.status = 400;
    response.body = "Invalid email or password";
    return;
  }
};

const postRegistrationForm = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const [passes, errors] = await validate(document, registerationRules);
  if (passes) {
    const email = document["email"];
    const password = document["password"];
    const verification = document["verification"];

    if (verification !== password) {
      response.status = 401;
      response.body = "verification and password does not mathch";
      return;
    }

    const user = await commonService.get_user_by_email(email);

    if (user.rowCount !== 0) {
      response.status = 300;
      response.body = "User already exists";
      return;
    }
    const hash = await bcrypt.hash(password);
    await executeQuery(
      "INSERT INTO users (email, password) VALUES ($1, $2);",
      email,
      hash
    );
    response.status = 200;
    return;
  } else {
    response.status = 400;
    response.body = "Invalid email or password";
    return;
  }
};

export { postLoginForm, postRegistrationForm, postTestForm };
