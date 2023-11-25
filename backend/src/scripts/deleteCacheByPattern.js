const redis = require("../redisClient");
const auth = require("../middleware/auth");

const deleteCacheByPattern = async (req, res) => {
  try {
    const pattern = req.body.pattern;
    await redis.keys(pattern, (err, keys) => {
      if (err) {
        console.log("Redis Caching client error: ", err);
      } else {
        keys.forEach((key) => {
          redis.del(key);
        });
      }
    });
    res.status(200).json({ message: "Cache deleted" });
  } catch (error) {
    console.error("Error deleting cache:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteCacheByPattern;
