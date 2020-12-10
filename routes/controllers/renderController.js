const renderTestPage = async ({ render }) => {
  render("test.ejs");
};

const renderMainPage = async ({ render }) => {
  render("index.ejs");
};

const renderLoginPage = async ({ render }) => {
  render("login.ejs");
};

const renderRegisterationPage = async ({ render }) => {
  render("register.ejs");
};

const renderDashboardPage = async ({ render }) => {
  render("dashboard.ejs");
};

export {
  renderMainPage,
  renderLoginPage,
  renderRegisterationPage,
  renderDashboardPage,
  renderTestPage,
};
