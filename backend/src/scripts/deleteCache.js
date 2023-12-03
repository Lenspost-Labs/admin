const express = require("express");
const redis = require("../redisClient");
const auth = require("../middleware/auth");

const router = express.Router();

const deleteCache = async (req, res) => {
  try {
    const key = req.body.data;
    await redis.del(key);
    res.status(200).json({ success: "Cache deleted successfully" });
  } catch (error) {
    console.error("Error deleting cache:", error);
    res.status(500).json({ error: error.messsage });
  }
};

router.post("/", auth, async (req, res) => {
  try {
    await deleteCache(req, res);
    res.status(200).json({ success: "Cache deleted successfully" });
  } catch (error) {
    console.error("Error deleting cache:", error);
    res.status(500).json({ error: error.messsage });
  }
});

module.exports = deleteCache;
