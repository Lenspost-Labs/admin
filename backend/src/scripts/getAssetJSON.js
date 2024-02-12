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

  const assetJSONPromises = data.map(async (item) => {
    const response = await axios.get(item, { responseType: "arraybuffer" });
    const dimensions = sizeOf(response.data);

    const asset = {
      image: item,
      tags: tagsArray,
      author: stickerAuthor,
      type,
      featured: featured,
      dimensions: [dimensions.width, dimensions.height],
      wallet,
      campaign,
    };

    return JSON.stringify(asset);
  });

  let asset = await Promise.all(assetJSONPromises);
  asset = JSON.parse(asset);
  try {
    await prisma.assets.createMany({
      data: asset,
      skipDuplicates: true,
    });

    console.log("Data uploaded to the database.");
    return { message: "Data uploaded to the database." };
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error;
  }
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
