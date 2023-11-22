const redis = require("../redisClient");

const deleteCache = async (req, res) => {
  try {
    const key = req.body.key;
    const cache = await redis.get(key);
    res.status(200).json({ success: "Cache deleted successfully" });
  } catch (error) {
    console.error("Error deleting cache:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteCache;
