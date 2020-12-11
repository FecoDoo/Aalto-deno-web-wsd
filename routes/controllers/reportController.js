import { executeQuery } from "../../database/database.js";
import {
  validate,
  required,
  isNumeric,
  numberBetween,
  isInt,
  isString,
  match,
} from "../../deps.js";

const MorningReportRules = {
  sleep_duration: [required, numberBetween(0, 24), isNumeric],
  sleep_quality: [required, numberBetween(1, 5), isInt],
  mood: [required, numberBetween(1, 5), isInt],
  date: [required, isString, match(/^\d{4}-\d{2}-\d{2}$/)],
};

const EveningReportRules = {
  sports: [required, numberBetween(0, 24), isNumeric],
  study: [required, numberBetween(0, 24), isNumeric],
  eating: [required, numberBetween(1, 5), isInt],
  mood: [required, numberBetween(1, 5), isInt],
  date: [required, isString, match(/^\d{4}-\d{2}-\d{2}$/)],
};

const postMorningReport = async ({ request, response, session }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const [passes, errors] = await validate(document, MorningReportRules);

  if (passes) {
    const user = await session.get("user");
    const user_id = user["id"];
    const res = await executeQuery(
      "SELECT * from morning WHERE user_id = $1 AND date = $2;",
      user_id,
      document["date"]
    );
    if (res.rowCount != 0) {
      await executeQuery(
        "UPDATE morning SET sleep_duration = $1 , sleep_quality = $2 , mood = $3 WHERE user_id = $4 AND date = $5;",
        document["sleep_duration"],
        document["sleep_quality"],
        document["mood"],
        user_id,
        document["date"]
      );
    } else {
      await executeQuery(
        "INSERT INTO morning (sleep_duration, sleep_quality, mood, user_id, date) VALUES ($1,$2,$3,$4,$5);",
        document["sleep_duration"],
        document["sleep_quality"],
        document["mood"],
        user_id,
        document["date"]
      );
    }

    response.status = 200;

    response.body = "Success";
  } else {
    response.status = 400;
    response.body = JSON.stringify(errors);
  }
};

const postEveningReport = async ({ request, response, session }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const [passes, errors] = await validate(document, EveningReportRules);

  if (passes) {
    const user = await session.get("user");
    const user_id = user["id"];
    const res = await executeQuery(
      "SELECT * from evening WHERE user_id = $1 AND date = $2;",
      user_id,
      document["date"]
    );
    if (res.rowCount != 0) {
      await executeQuery(
        "UPDATE evening SET sports = $1 , study = $2 , eating = $3 , mood = $4 WHERE user_id = $5 AND date = $6;",
        document["sports"],
        document["study"],
        document["eating"],
        document["mood"],
        user_id,
        document["date"]
      );
    } else {
      await executeQuery(
        "INSERT INTO evening (sports, study, eating, mood, user_id, date) VALUES ($1,$2,$3,$4,$5, $6);",
        document["sports"],
        document["study"],
        document["eating"],
        document["mood"],
        user_id,
        document["date"]
      );
    }

    response.status = 200;

    response.body = "Success";
  } else {
    response.status = 400;
    response.body = JSON.stringify(errors);
  }
};

const getReportStatus = async ({ response, session }) => {
  const data = {
    morning: "Not submitted yet",
    evening: "Not submitted yet",
  };
  const user = await session.get("user");
  const user_id = user["id"];
  const morning = await executeQuery(
    "SELECT * from morning WHERE user_id = $1 AND date = CURRENT_DATE;",
    user_id
  );
  if (morning.rowCount != 0) {
    data.morning = "Already submitted";
  }

  const evening = await executeQuery(
    "SELECT * from evening WHERE user_id = $1 AND date = CURRENT_DATE;",
    user_id
  );
  if (evening.rowCount != 0) {
    data.evening = "Already submitted";
  }
  response.body = JSON.stringify(data);
};

export { postMorningReport, postEveningReport, getReportStatus };
