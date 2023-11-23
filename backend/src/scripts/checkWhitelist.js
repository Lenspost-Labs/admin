const express = require("express");
const router = express.Router();
const whitelistedEmails = ["sugatobagchi@dsec.ac.in", "tirumaladasa@gmail.com"];

router.post("/", async (req, res) => {
  try {
    const { email } = req.query;
    if (whitelistedEmails.includes(email)) {
      res.status(200).json({ whitelisted: true });
    } else {
      res.status(200).json({ whitelisted: false });
    }
  } catch (error) {
    console.error("Error in authentication", error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
