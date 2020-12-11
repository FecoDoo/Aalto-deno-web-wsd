/*
 Navicat Premium Data Transfer

 Source Server         : wsd
 Source Server Type    : PostgreSQL
 Source Server Version : 120005
 Source Host           : localhost:5432
 Source Catalog        : wsd
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120005
 File Encoding         : 65001

 Date: 12/12/2020 01:40:59
*/


-- ----------------------------
-- Sequence structure for evening_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."evening_id_seq";
CREATE SEQUENCE "public"."evening_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."evening_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for morning_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."morning_id_seq";
CREATE SEQUENCE "public"."morning_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."morning_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."users_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for evening
-- ----------------------------
DROP TABLE IF EXISTS "public"."evening";
CREATE TABLE "public"."evening" (
  "id" int4 NOT NULL DEFAULT nextval('evening_id_seq'::regclass),
  "user_id" int4 NOT NULL,
  "sports" float4 NOT NULL,
  "study" float4 NOT NULL,
  "eating" int2 NOT NULL,
  "mood" int2 NOT NULL,
  "date" date NOT NULL DEFAULT CURRENT_DATE
)
;
ALTER TABLE "public"."evening" OWNER TO "postgres";

-- ----------------------------
-- Records of evening
-- ----------------------------
BEGIN;
INSERT INTO "public"."evening" VALUES (1, 37, 5, 2, 5, 2, '2020-12-10');
INSERT INTO "public"."evening" VALUES (2, 37, 6, 1, 3, 1, '2020-12-09');
INSERT INTO "public"."evening" VALUES (3, 37, 24, 14, 1, 3, '2020-12-12');
INSERT INTO "public"."evening" VALUES (4, 37, 24, 14, 1, 3, '2021-04-04');
INSERT INTO "public"."evening" VALUES (5, 37, 24, 14, 1, 3, '2021-05-18');
INSERT INTO "public"."evening" VALUES (6, 37, 12, 23, 4, 4, '2020-11-04');
COMMIT;

-- ----------------------------
-- Table structure for morning
-- ----------------------------
DROP TABLE IF EXISTS "public"."morning";
CREATE TABLE "public"."morning" (
  "id" int4 NOT NULL DEFAULT nextval('morning_id_seq'::regclass),
  "sleep_duration" float4 NOT NULL,
  "sleep_quality" int2 NOT NULL,
  "mood" int2 NOT NULL,
  "user_id" int4 NOT NULL,
  "date" date NOT NULL DEFAULT CURRENT_DATE
)
;
ALTER TABLE "public"."morning" OWNER TO "postgres";

-- ----------------------------
-- Records of morning
-- ----------------------------
BEGIN;
INSERT INTO "public"."morning" VALUES (2, 12, 3, 3, 37, '2020-12-11');
INSERT INTO "public"."morning" VALUES (4, 12, 4, 1, 37, '2020-12-10');
INSERT INTO "public"."morning" VALUES (5, 1, 2, 1, 37, '2020-12-09');
INSERT INTO "public"."morning" VALUES (6, 5, 2, 5, 37, '2020-12-08');
INSERT INTO "public"."morning" VALUES (7, 8, 1, 4, 37, '2020-12-07');
INSERT INTO "public"."morning" VALUES (8, 23, 1, 1, 37, '2020-12-12');
INSERT INTO "public"."morning" VALUES (9, 15, 1, 5, 37, '2020-11-01');
INSERT INTO "public"."morning" VALUES (10, 15, 2, 3, 37, '2020-11-02');
INSERT INTO "public"."morning" VALUES (11, 1, 4, 2, 37, '2020-11-03');
INSERT INTO "public"."morning" VALUES (12, 13, 1, 1, 37, '2020-11-04');
INSERT INTO "public"."morning" VALUES (13, 22, 1, 2, 37, '2020-11-05');
INSERT INTO "public"."morning" VALUES (14, 5, 4, 5, 37, '2020-11-06');
INSERT INTO "public"."morning" VALUES (15, 14, 5, 5, 37, '2020-11-07');
INSERT INTO "public"."morning" VALUES (16, 2, 3, 2, 37, '2020-11-08');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "email" varchar(320) COLLATE "pg_catalog"."default" NOT NULL,
  "password" char(60) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."users" OWNER TO "postgres";

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO "public"."users" VALUES (37, 'yao.kai@aalto.fi', '$2a$10$9q9/o60TsxUu60XYgr71ZucN50VUo1p1iDbjE1/oULlLaF9HtH.R.');
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."evening_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."morning_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."users_id_seq"', 39, true);
