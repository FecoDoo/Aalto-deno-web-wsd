import { executeQuery } from "../database/database.js";

const getNews = async () => {
  const res = await executeQuery(
    "SELECT id,title,content FROM news ORDER BY id"
  );
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }

  return [];
};

const getNewsById = async (id) => {
  if (id) {
    const res = await executeQuery(
      "SELECT id,title,content FROM news WHERE id = ($1)",
      id
    );
    if (res && res.rowCount > 0) {
      return res.rowsOfObjects()[0];
    }
  }

  return {};
};

const addNews = async (title, content) => {
  if (title && content) {
    await executeQuery(
      "INSERT INTO news (title, content) VALUES ($1, $2);",
      title,
      content
    );
  }
};

const deleteNewsById = async (id) => {
  if (id) {
    await executeQuery("DELETE FROM news WHERE id = ($1)", id);
  }
  return;
};

export { getNews, addNews, getNewsById, deleteNewsById };
