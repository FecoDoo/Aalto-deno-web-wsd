import { executeQuery } from "../database/database.js";
import {
  validate,
  required,
  isEmail,
  lengthBetween,
  maxLength,
  minLength,
} from "../deps.js";

const loginRules = {
  email: [required, maxLength(320), isEmail],
  password: [required, lengthBetween(4, 60)],
};

const registerationRules = {
  email: [required, maxLength(320), isEmail],
  password: [required, lengthBetween(4, 60)],
  verification: [required, lengthBetween(4, 60)],
};

const check = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  const [passes, errors] = await validate(data, loginRules);
  return passes;
};

const get_user_by_email = async (email) => {
  return await executeQuery("SELECT * FROM users WHERE email = $1;", email);
};

const get_user_by_id = async (id) => {
  return await executeQuery("SELECT * FROM users WHERE id = $1;", id);
};

export { get_user_by_email, get_user_by_id, check };
