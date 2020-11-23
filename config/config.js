let config = {};

if (Deno.env.get("TEST_ENVIRONMENT")) {
  config.database = {};
} else {
  config.database = {
    hostname: "localhost",
    database: "wsd",
    user: "postgres",
    password: "postgres",
    port: 5432,
  };
}

export { config };
