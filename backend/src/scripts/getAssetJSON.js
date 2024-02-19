const express = require("express");
const axios = require("axios");
const sizeOf = require("image-size");
const auth = require("../middleware/auth");
const prisma = require("../prisma");

const router = express.Router();

const processAssetJSON = async (requestData) => {
  const { stickerAuthor, type, data, tags, wallet, campaign, featured } =
    requestData;

  const tagsArray = Array.isArray(tags) ? tags : [];

  const promiseArray = data.map((item) => {
    return axios.get(item.trim(), { responseType: "arraybuffer" });
  });

  let asset = await Promise.all(promiseArray);

  for (let i = 0; i < data.length; i++) {
    const dimensions = sizeOf(asset[i].data);
    const assetData = {
      image: data[i].trim(),
      tags: tagsArray,
      author: stickerAuthor,
      type,
      featured: featured,
      dimensions: [dimensions.width, dimensions.height],
      wallet,
      campaign,
    };

    await prisma.assets.createMany({
      data: assetData,
      skipDuplicates: true,
    });
  }

  // console.log("Data uploaded to the database.");
  return { message: "Data uploaded to the database." };
};

router.post("/", auth, async (req, res) => {
  try {
    const assetJSON = await processAssetJSON(req.body);
    res.status(200).json(assetJSON);
  } catch (error) {
    console.error("Error generating asset JSON:", error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
