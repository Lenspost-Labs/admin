const aws = require("aws-sdk");
const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const upload = multer();
const auth = require("../middleware/auth");

dotenv.config();

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadToS3 = async (file, key, folderName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderName}/${key}`,
    Body: file,
    ContentType: "image/png",
    ACL: "public-read",
  };

  return await s3.upload(params).promise();
};

router.post("/", auth, upload.array("files"), async (req, res) => {
  try {
    // You need to change the folderName to location you want the files to be uploaded.
    let folderName = "test".trim().replace(/\/$/, "");

    const files = req.files; 
    let urls = [];
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        let res = await uploadToS3(file.buffer, file.originalname, folderName);
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
