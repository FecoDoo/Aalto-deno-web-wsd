let config = {};

if (Deno.env.get("DATABASE_URL")) {
  config.database = Deno.env.get("DATABASE_URL");
} else {
  config.database = {};
}

// config.database = {
//   hostname: "hostname-possibly-at-elephantsql.com",
//   database: "database-name",
//   user: "user-name-typically-same-as-database-name",
//   password: "password",
//   port: 5432,
// };
export { config };
