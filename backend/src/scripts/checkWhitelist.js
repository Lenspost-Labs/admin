const express = require("express");
const router = express.Router();
const generateJwt = require("../utils/generateJwt");
const jsonwebtoken = require("jsonwebtoken");

const whitelistedEmails = ["sugatobagchi@dsec.ac.in", "tirumaladasa@gmail.com", "aryan@lenspost.xyz", "chakra@lenspost.xyz", "cybershakti@lenspost.xy"];

router.post("/", async (req, res) => {
  try {
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ error: "Email not provided" });
    }

    if (whitelistedEmails.includes(email.toLowerCase())) {

      const token = generateJwt(email);
      res.status(200).json({ whitelisted: true, token });
    } else {
      res.status(200).json({ whitelisted: false });
    }
  } catch (error) {
    console.error("Error in authentication", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
