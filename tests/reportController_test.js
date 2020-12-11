import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test({
  name:
    "POST request /behavior/reporting/morning with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sleep_duration: 25,
      sleep_quality: 0,
      mood: 0,
    };
    await testClient.post("/behavior/reporting/morning").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request /behavior/reporting/morning with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sleep_duration: 12,
      sleep_quality: 0,
      mood: 8,
      date: "2020-10-18",
    };
    await testClient.post("/behavior/reporting/morning").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request /behavior/reporting/morning with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sleep_duration: 22,
      sleep_quality: 6,
      mood: 0,
      date: "2020-10-18",
    };
    await testClient.post("/behavior/reporting/morning").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request /behavior/reporting/evening with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sports: 25,
      study: 3,
      eating: 0,
      mood: 0,
      date: "2020-10-18",
    };
    await testClient.post("/behavior/reporting/evening").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request /behavior/reporting/evening with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sports: 22,
      study: 6,
      eating: 0,
      mood: 0,
      date: "2020-10-18",
    };
    await testClient.post("/behavior/reporting/evening").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name:
    "POST request /behavior/reporting/evening with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sports: 25,
      study: 3,
      eating: 8,
      mood: 0,
      date: "2020-10-18",
    };
    await testClient.post("/behavior/reporting/evening").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name:
    "POST request /behavior/reporting/evening with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sports: 25,
      study: 3,
      eating: 2,
      mood: -3,
      date: "2020-10-18",
    };
    await testClient.post("/behavior/reporting/evening").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "POST request /behavior/reporting/evening with invalid form should return 400",
  async fn() {
    const testClient = await superoak(app);
    const res = {
      sports: 25,
      study: 3,
      eating: 2,
      mood: 2,
      date: "2020",
    };
    await testClient.post("/behavior/reporting/evening").send(res).expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
