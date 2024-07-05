const express = require("express");
const cors = require("cors");

const auth = require("./middleware/auth");
const checkWhitelist = require("./scripts/checkWhitelist");
const fileToS3 = require("./scripts/fileToS3");
const getAssetJSON = require("./scripts/getAssetJSON");
const showCollections = require("./collections/showCollections");
const templates = require("./templates/templates");
const tasks = require("./tasks/tasks");
const users = require("./users/users.js");
const cache = require("./cache/cache.js");
const addWhitelisting = require("./whitelisting/addWhitelisting.js");
const getAllPointsHistory = require("./rewards/getAllPointsHistory");

const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/checkWhitelist", checkWhitelist);
app.use("/fileToS3", auth, fileToS3);
app.use("/getAssetJSON", auth, getAssetJSON);
app.use("/collections", auth, showCollections);
app.use("/templates", auth, templates);
app.use("/tasks", auth, tasks);
app.use("/cache", auth, cache);
app.use("/getAllPointsHistory", auth, getAllPointsHistory);
app.use("/users", auth, users);
app.use("/whitelisting",  addWhitelisting);

let PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
