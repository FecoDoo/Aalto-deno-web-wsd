const get_user_email = async ({ session }) => {
  const email = await session.get("user")["email"];
  return email;
};

const renderTestPage = async ({ render }) => {
  render("test.ejs");
};

const renderMainPage = async ({ render }) => {
  render("index.ejs");
};

const renderLoginPage = async ({ render }) => {
  render("auth/login.ejs");
};

const renderRegisterationPage = async ({ render }) => {
  render("auth/register.ejs");
};

const renderLogoutPage = async ({ render }) => {
  render("auth/logout.ejs");
};

const renderDashboardPage = async ({ render, session }) => {
  const user = await session.get("user");
  render("user/dashboard.ejs", { email: user.email });
};

const renderMorningPage = async ({ render, session }) => {
  const user = await session.get("user");
  render("report/morning.ejs", { email: user.email });
};

const renderEveningPage = async ({ render, session }) => {
  const user = await session.get("user");
  render("report/evening.ejs", { email: user.email });
};

const renderReportPage = async ({ render, session }) => {
  const user = await session.get("user");
  render("report/report.ejs", { email: user.email });
};

const renderSummaryPage = async ({ render, session }) => {
  const user = await session.get("user");
  render("summary/summary.ejs", { email: user.email });
};

export {
  renderMainPage,
  renderLoginPage,
  renderRegisterationPage,
  renderDashboardPage,
  renderTestPage,
  renderLogoutPage,
  renderMorningPage,
  renderEveningPage,
  renderReportPage,
  renderSummaryPage,
};
