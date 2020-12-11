import { executeQuery } from "../../database/database.js";
import { validate, required, isString, match } from "../../deps.js";

const morning_query =
  "SELECT AVG(sleep_duration) AS sleep_duration, AVG (sleep_quality) AS sleep_quality,AVG (mood) AS mood FROM morning";
const evening_query =
  "SELECT AVG (sports) as sports, AVG (study) as study,AVG (mood) AS mood FROM evening";

const summaryRules = {
  week: [required, match(/^\d{4}-W\d{2}$/), isString],
  month: [required, match(/^\d{4}-\d{2}$/), isString],
};
const sendSummary = async ({ request, response, session }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const [passes, errors] = await validate(document, summaryRules);

  if (passes) {
    const user = await session.get("user");
    const user_id = user["id"];
    const data = {
      weekly: null,
      monthly: null,
    };

    let year = document["week"].split("-")[0];
    let week_tmp = document["week"].split("-")[1].split("");
    let week = week_tmp[1] + week_tmp[2];
    data.weekly = await by_week(week, year, user_id);

    year = document["month"].split("-")[0];
    let month = document["month"].split("-")[1];
    data.monthly = await by_month(month, year, user_id);

    response.status = 200;
    response.body = JSON.stringify(data);
  } else {
    response.status = 400;
    response.body = JSON.stringify(errors);
  }
};

const by_week = async (week, year, user_id) => {
  let res = {
    average_sleep_duration: 0,
    average_sleep_quality: 0,
    average_time_on_sports: 0,
    average_time_on_studing: 0,
    average_mood: 0,
  };
  const constraints =
    "WHERE EXTRACT(WEEK FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2 AND user_id = $3";
  let average_mood = 0;

  const morning = await executeQuery(
    morning_query + " " + constraints,
    week,
    year,
    user_id
  );
  if (morning.rowCount != 0) {
    const morningObj = morning.rowsOfObjects()[0];
    res.average_sleep_duration = morningObj["sleep_duration"];
    res.average_sleep_quality = morningObj["sleep_quality"];
    average_mood = Number(morningObj["mood"]);
  }

  const evening = await executeQuery(
    evening_query + " " + constraints,
    week,
    year,
    user_id
  );

  if (evening.rowCount != 0) {
    const eveningObj = evening.rowsOfObjects()[0];
    res.average_time_on_sports = eveningObj["sports"];
    res.average_time_on_studing = eveningObj["study"];
    average_mood = average_mood + Number(eveningObj["mood"]);
  }

  res.average_mood = Math.round(average_mood / 2);
  return res;
};

const by_month = async (month, year, user_id) => {
  const res = {
    average_sleep_duration: 0,
    average_sleep_quality: 0,
    average_time_on_sports: 0,
    average_time_on_studing: 0,
    average_mood: 0,
  };
  const constraints =
    "WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2 AND user_id = $3";
  let average_mood = 0;

  const morning = await executeQuery(
    morning_query + " " + constraints,
    month,
    year,
    user_id
  );
  if (morning.rowCount != 0) {
    const morningObj = morning.rowsOfObjects()[0];
    res.average_sleep_duration = morningObj["sleep_duration"];
    res.average_sleep_quality = morningObj["sleep_quality"];
    average_mood = Number(morningObj["mood"]);
  }

  const evening = await executeQuery(
    evening_query + " " + constraints,
    month,
    year,
    user_id
  );

  if (evening.rowCount != 0) {
    const eveningObj = evening.rowsOfObjects()[0];
    res.average_time_on_sports = eveningObj["sports"];
    res.average_time_on_studing = eveningObj["study"];
    average_mood = average_mood + Number(eveningObj["mood"]);
  }

  res.average_mood = Math.round(average_mood / 2);
  return res;
};

export { sendSummary };
