const aws = require("aws-sdk");
const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const upload = multer();

dotenv.config();

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadToS3 = async (file, key, folderName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderName}/${file.originalname}`,
    Body: file,
    ContentType: "image/png",
    ACL: "public-read",
  };

  return await s3.upload(params).promise();
};

router.post("/", async (req, res) => {
  try {
    let folderName = "test".trim().replace(/\/$/, "");

    const files = req.files;
    const imageUrls = await Promise.all(
      files.map(async (file) =>
        uploadToS3(file.buffer, file.originalname, folderName)
      )
    );

    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
