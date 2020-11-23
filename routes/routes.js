import { Router } from "../deps.js";
import * as newsApi from "./apis/newsApi.js";
import * as newsController from "./controllers/newsController.js";

const router = new Router();

router.get("/", newsController.renderNews);
router.get("/news/:id", newsController.renderNewsById);

router.get("/api/news", newsApi.getNews);
router.post("/api/news", newsApi.addNews);
router.get("/api/news/:id", newsApi.getNewsById);
router.delete("/api/news/:id", newsApi.deleteNewsById);

export { router };
