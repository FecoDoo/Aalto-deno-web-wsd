import { Pool } from "../deps.js";
import { config } from "../config/config.js";

let cache = {};

const connectionPool = new Pool(config.database, 5);

const executeQuery = async (query, ...args) => {
  const client = await connectionPool.connect();
  try {
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
  return null;
};

const executeCachedQuery = async (query, ...params) => {
  const key = query + params.reduce((acc, o) => acc + "-" + o, "");
  if (cache[key]) {
    return cache[key];
  }

  const res = await executeQuery(query, ...params);
  cache[key] = res;

  return res;
};

export { executeQuery, executeCachedQuery };
