const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    const users = await prisma.owners.findMany();
    const sortedData = users.sort((a, b) => a.id - b.id);
    // console.log(sortedData);

    res.status(200).json(sortedData);
  } catch (error) {
    console.error("Error in authentication", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
