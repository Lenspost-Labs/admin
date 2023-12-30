const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {


  try {
    const tasks = await prisma.tasks.create({
      data: {
        description: "Lenspost Admin Test",
        campaign: null,
        locked: true,
        amount: 10,
        name: "Lenspost Admin Test",
      },
    });
    res.json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
