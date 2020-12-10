const renderMainPage = async ({ render }) => {
  render("index.ejs");
};

const renderLoginPage = async ({ render }) => {
  render("login.ejs", { error: null });
};

const renderRegisterationPage = async ({ render }) => {
  render("register.ejs", { error: null });
};

const renderDashboardPage = async ({ render }) => {
  render("dashboard.ejs");
};

export { renderMainPage, renderLoginPage, renderRegisterationPage,renderDashboardPage };
