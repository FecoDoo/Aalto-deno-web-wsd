import * as newsService from "../../services/newsService.js";

const getNews = async ({ response }) => {
  response.body = await newsService.getNews();
};

const getNewsById = async ({ request, response }) => {
  const id = request.url.pathname.split("/")[3];
  response.body = await newsService.getNewsById(id);
};

const addNews = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  newsService.addNews(document.title, document.content);

  response.body = 200;
};

const deleteNewsById = async ({ request, response }) => {
  const id = request.url.pathname.split("/")[3];
  await newsService.deleteNewsById(id);
  response.body = 200;
};

export { getNews, addNews, getNewsById, deleteNewsById };
