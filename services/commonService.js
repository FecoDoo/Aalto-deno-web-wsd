import { executeQuery } from "../database/database.js";

const get_user_by_email = async (email) => {
  return await executeQuery("SELECT * FROM users WHERE email = $1;", email);
};

const get_user_by_id = async (id) => {
  return await executeQuery("SELECT * FROM users WHERE id = $1;", id);
};

export { get_user_by_email, get_user_by_id };
