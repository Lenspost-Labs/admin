const express = require("express");
const router = express.Router();
const redis = require("../redisClient");

router.get("/", async (req, res) => {
  try {
    const { wallet, network, type } = req.body;

    let cache = await redis.get("wallet_whitelisted_registry");

    cache = JSON.parse(cache);
    cache.items.push({ wallet, network, type });

    await redis.set("wallet_whitelisted_registry", JSON.stringify(cache));

    cache = await redis.get("wallet_whitelisted_registry");
    cache = JSON.parse(cache);

    if (cache) {
      res.status(200).json({ success: true, data: cache });
    } else {
      res.status(500).json({ message: "No Cache Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
});

module.exports = router;
