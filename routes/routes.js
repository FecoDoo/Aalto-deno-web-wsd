import { Router } from "../deps.js";

import * as authController from "./controllers/authController.js";
import * as renderController from "./controllers/renderController.js";

const router = new Router();

router.get("/", renderController.renderMainPage);
router.get("/auth/login", renderController.renderLoginPage);
router.get("/auth/registration", renderController.renderRegisterationPage);
router.get("/dashboard", renderController.renderDashboardPage);

router.post("/auth/login", authController.postLoginForm);
router.post("/auth/registration", authController.postRegistrationForm);

// router.get("/news/:id", newsController.renderNewsById);

// router.get("/api/news", newsApi.getNews);
// router.post("/api/news", newsApi.addNews);
// router.get("/api/news/:id", newsApi.getNewsById);
// router.delete("/api/news/:id", newsApi.deleteNewsById);

export { router };
