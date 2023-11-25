const express = require("express");
const cors = require("cors");
const fileToS3 = require("./scripts/fileToS3");
const getAssetJSON = require("./scripts/getAssetJSON");
const deleteCache = require("./scripts/deleteCache");
const deleteCacheByPattern = require("./scripts/deleteCacheByPattern");
const checkWhitelist = require("./scripts/checkWhitelist");
const uploadToDb = require("./scripts/uploadToDb");
const dotenv = require("dotenv");
const auth = require("./middleware/auth");

const app = express();
const PORT = 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/fileToS3", auth, fileToS3);
app.use("/getAssetJSON", auth, getAssetJSON);
app.use("/deleteCache", auth, deleteCache);
app.use("/deleteCacheByPattern", auth, deleteCacheByPattern);
app.use("/checkWhitelist", checkWhitelist);
app.use("/uploadToDb", auth, uploadToDb);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
