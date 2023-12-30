const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const tasks = await prisma.tasks.create({
      data: {
        description: "Lenspost Admin Test",
        campaign: null,
        locked: true,
        amount: 10,
        name: "Lenspost Admin Test",
        campaign: "Admin",
      },
    });
    res.json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
