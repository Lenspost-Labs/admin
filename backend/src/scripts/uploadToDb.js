const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

const uploadToDb = async (data) => {
  try {
    JSON.parse(data);
    console.log(data);
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data format. Expected JSON object.");
    }

    // The below code will push data to production DB.
    // If you want to test then change the json file data campaign value to test so that we can delete it manually

    // await prisma.assets.createMany({
    //   data: data,
    //   skipDuplicates: true,
    // });

    console.log("Data uploaded to the database.");
    return { message: "Data uploaded to the database." };
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error;
  }
};

router.post("/", async (req, res) => {
  try {
    const requestData = req.body;
    if (!requestData) {
      return res
        .status(400)
        .json({ error: "No data received in the request." });
    }

    const result = await uploadToDb(requestData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
