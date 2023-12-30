const aws = require("aws-sdk");
const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const upload = multer();

dotenv.config();

const router = express.Router();

router.post("/", upload.array("files"), async (req, res) => {
  try {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    let folderName = req.body.folderName.trim().replace(/\/$/, "");
    const files = req.files;
    let urls = [];
    await Promise.all(
      files.map(async (file) => {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${folderName}/${file.originalname}`,
          Body: file.buffer,
          ContentType: "image/png",
          ACL: "public-read",
        };
        const res = await s3.upload(params).promise();
        urls.push(res.Location);
      })
    );

    res.status(200).json(urls);
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
