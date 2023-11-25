const redis = require("../redisClient");
const auth = require("../middleware/auth");

const deleteCache = async (req, res) => {
  try {
    const key = req.body.key;
    await redis.del(key);
    res.status(200).json({ success: "Cache deleted successfully" });
  } catch (error) {
    console.error("Error deleting cache:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteCache;
