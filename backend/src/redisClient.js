const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_CACHE,
});

redis.connect();

redis.on("error", (err) => {
  console.error("Redis Caching client error:", err);
});

redis.on("connect", () => {
  console.log("Redis Caching client connected");
});

module.exports = redis;
