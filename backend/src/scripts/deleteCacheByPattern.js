const express = require("express");
const redis = require("../redisClient");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const pattern = req.body.pattern;
    let keys = await redis.keys("*");
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      keys[i].includes(pattern) &&
        (await redis.del(keys[i])) &&
        console.log("Cache Deleted");
    }
    res.status(200).json({ message: "Cache deleted" });
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
});

module.exports = router;
