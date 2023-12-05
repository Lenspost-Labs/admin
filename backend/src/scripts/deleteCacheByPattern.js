const express = require("express");
const redis = require("../redisClient");
const auth = require("../middleware/auth");

const router = express.Router();

const deleteCacheByPattern = async (req, res) => {
  try {
    const pattern = req.body.data;
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
    res.status(500).json({ error: error.message });
  }
};


router.post("/", auth, async (req, res) => {
  try {
    await deleteCacheByPattern(req, res);
    res.status(200).json({ success: "Cache deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
});

module.exports = deleteCacheByPattern;
