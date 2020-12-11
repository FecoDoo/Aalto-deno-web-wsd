import { Router } from "../deps.js";

import * as authController from "./controllers/authController.js";
import * as renderController from "./controllers/renderController.js";
import * as reportController from "./controllers/reportController.js";
import * as summaryController from "./controllers/summaryController.js";
import * as trendApi from "./apis/trendApi.js";
const router = new Router();

router.get("/", renderController.renderMainPage);
router.get("/user/dashboard", renderController.renderDashboardPage);
router.get("/behavior/reporting/morning", renderController.renderMorningPage);
router.get("/behavior/reporting/evening", renderController.renderEveningPage);
router.get("/behavior/reporting", renderController.renderReportPage);
router.get("/behavior/summary", renderController.renderSummaryPage);

router.get("/auth/login", renderController.renderLoginPage);
router.get("/auth/registration", renderController.renderRegisterationPage);
router.get("/auth/logout", renderController.renderLogoutPage);
router.get("/auth/test", renderController.renderTestPage);

router.post("/auth/login", authController.postLoginForm);
router.post("/auth/registration", authController.postRegistrationForm);
router.post("/auth/logout", authController.logout);
router.post("/auth/test", authController.postTestForm);

router.post("/behavior/reporting/morning", reportController.postMorningReport);
router.post("/behavior/reporting/evening", reportController.postEveningReport);
router.post("/behavior/reporting", reportController.getReportStatus);
router.post("/behavior/summary", summaryController.sendSummary);

router.post("/api/trend", trendApi.get_average_mood);
// router.get("/news/:id", newsController.renderNewsById);

// router.get("/api/news", newsApi.getNews);
// router.post("/api/news", newsApi.addNews);
// router.get("/api/news/:id", newsApi.getNewsById);
// router.delete("/api/news/:id", newsApi.deleteNewsById);

export { router };
