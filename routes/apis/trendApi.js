import { executeQuery } from "../../database/database.js";

const get_average_mood = async ({ response }) => {
  let mood = 0;
  const res = await executeQuery(
    "SELECT mood from morning WHERE date between (current_date -1 ) AND current_date;"
  );
  if (res.rowCount != 0) {
    response.body = JSON.stringify(res.rowsOfObjects());
    response.status = 200;
  } else {
    response.status = 400;
    response.body =
      "Data missing for today or yestoday, did you forget to submit?";
  }
};

export { get_average_mood };
