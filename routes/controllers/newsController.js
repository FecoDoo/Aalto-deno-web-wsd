import { getNews, getNewsById } from "../../services/newsService.js";

const renderNews = async ({ render }) => {
  render("index.ejs", { news: await getNews() });
};

const renderNewsById = async ({ request, render }) => {
  const id = request.url.pathname.split("/")[2];
  render("news-item.ejs", { news: await getNewsById(id) });
};

export { renderNews, renderNewsById };
