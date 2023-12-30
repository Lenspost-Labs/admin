const express = require("express");
const redis = require("../redisClient");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const pattern = req.body.pattern;
    console.log(pattern);
    await redis.keys(pattern, (err, keys) => {
      if (err) {
        console.log("Redis Caching client error: ", err);
      } else {
        keys.forEach((key) => {
          console.log(key);
          redis.del(key);
        });
      }
    });
    res.status(200).json({ message: "Cache deleted" });
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
});

module.exports = router;
