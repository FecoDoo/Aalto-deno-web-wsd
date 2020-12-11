# Docs

## 1. Database

Create a database called public

Then excute the sql restore file (public.sql), the file is located within the `/config` folder

if public.sql script does not work , then try this:

```sql
CREATE TABLE "users" (
  "id" SERIAL NOT NULL,
  "email" varchar(320) NOT NULL,
  "password" varchar(60) NOT NULL,
  PRIMARY KEY ("id")
)
;

CREATE TABLE "evening" (
  "id" SERIAL NOT NULL,
  "user_id" int4 NOT NULL,
  "sports" int2 NOT NULL,
  "study" int2 NOT NULL,
  "eating" int2 NOT NULL,
  "mood" int2 NOT NULL,
  "date" date NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY ("id"),
  CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
)
;

CREATE TABLE "morning" (
  "id" SERIAL NOT NULL,
  "user_id" int4 NOT NULL,
  "sleep_duration" float4 NOT NULL,
  "sleep_quality" int2 NOT NULL,
  "mood" int2 NOT NULL,
  "date" date NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY ("id"),
  CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
)
;
```

## Running application

Now the application is runable (if env variables are set correctly for the config.database)

The entry point is app.js in the root path, use

```bash
deno run --allow-all --unstable app.js
```

Once the application is running, access `http://localhost:7777/` and you will see the front page

If access secret pages, you will be redirect to login page.

## Online Version

esd