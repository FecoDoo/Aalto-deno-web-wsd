import { executeQuery } from "../../database/database.js";
import { bcrypt } from "../../deps.js";
import * as commonService from "../../services/commonService.js";

const postLoginForm = async ({ request, response, session, render }) => {
  let error = "Invalid email or password";
  const body = request.body();
  if (body.type == "undefined") {
    response.redirect("/auth/login");
    return;
  }

  const params = await body.value;

  if (params.has("email") && params.has("password")) {
    const email = params.get("email");
    const password = params.get("password");
    if (await commonService.check(email, password)) {
      // check if the email exists in the database
      const user = await commonService.get_user_by_email(email);

      if (user.rowCount === 0) {
        response.status = 401;
        error = "User not found";
      } else {
        // take the first row from the results
        const userObj = user.rowsOfObjects()[0];

        const hash = userObj.password;

        const passwordCorrect = await bcrypt.compare(password, hash);

        if (!passwordCorrect) {
          response.status = 401;
          error = "Password incorrect";
        } else {
          await session.set("authenticated", true);
          await session.set("user", {
            id: userObj.id,
            email: userObj.email,
          });
          response.status = 200;
          response.body = "Authentication successful!";
          response.redirect("/dashboard");
          return;
        }
      }
    }
  }

  render("login.ejs", { error: error });
};

const postRegistrationForm = async ({ request, response,render }) => {
  let error = "Invalid email or password";
  const body = request.body();
  if (body.type == "undefined") {
    render("register.ejs", {error:error})
    return;
  }

  const params = await body.value;

  if (
    params.has("email") &&
    params.has("password") &&
    params.has("verification")
  ) {
    const email = params.get("email");
    const password = params.get("password");
    const verification = params.get("verification");
    if (
      password == verification &&
      (await commonService.check(email, password))
    ) {
      const hash = await bcrypt.hash(password);
      await executeQuery(
        "INSERT INTO users (email, password) VALUES ($1, $2);",
        email,
        hash
      );
      response.status = 200;
      response.body = "Success";
      response.redirect("/dashboard");
    } else {
      response.status = 400;
      error = "Form invalid";
    }
  }
  render("register.ejs", { error: error });
};

export { postLoginForm, postRegistrationForm };
