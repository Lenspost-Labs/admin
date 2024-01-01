const express = require("express");
const redis = require("../redisClient");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/pattern", auth, async (req, res) => {
  try {
    const key = req.body.pattern;
    let keys = await redis.keys("*");
    for (let i = 0; i < keys.length; i++) {
      // keys[i].includes(key) && (await redis.del(keys[i]));
      if (keys[i].includes(key)) console.log("hello");
    }
    res.status(200).json({ message: "Cache deleted" });
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
});

router.post("/cache", auth, async (req, res) => {
  try {
    const key = req.body.data;
    const cache = await redis.get(key);
    if (cache) {
      await redis.del(key);
      res.status(200).json({ success: "Cache deleted successfully" });
    } else {
      res.status(500).json({ message: "No Cache Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
});

router.get("/fetch", auth, async (req, res) => {
  try {
    // let key = req.body.pattern;
    let pattern = `/${req.body.pattern}/i`;

    let keys = await redis.keys("*");
    let data = [];
    let matches = keys.filter((key) => key.test(pattern));
    res.status(200).json({ message: matches });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.messsage });
  }
});

module.exports = router;
