const express = require("express");
const prisma = require("../prisma");
const auth = require("../middleware/auth");

const router = express.Router();

const uploadToDb = async (datas) => {
  try {
    // console.log(datas);
    // if (!datas || !Array.isArray(datas)) {
    //   throw new Error(
    //     "Invalid data format. Expected an array of JSON objects."
    //   );
    // }

    // const assets = datas.map((data) => {
    //   const parsedData = JSON.parse(data);

      // if (typeof parsedData !== "boolean") {
      //   if (parsedData.featured === "true") {
      //     parsedData.featured = true;
      //   } else {
      //     parsedData.featured = false;
      //   }
      // }

    //   return parsedData;
    // });

    await prisma.assets.createMany({
      data: datas,
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
    console.log(req.body.data);
    let data = req.body.data;
    let requestData = data;
    // if (!requestData || !Array.isArray(requestData)) {
    //   return res.status(400).json({
    //     error: "Invalid request format. Expected an array of JSON objects.",
    //   });
    // }

    const result = await uploadToDb(requestData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
