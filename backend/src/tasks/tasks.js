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
  const { description, campaign, locked, amount, name, type } = req.body;

  try {
    await prisma.tasks.create({
      data: {
        description,
        campaign,
        locked,
        amount,
        name,
        type,
      },
    });
    // res.json(tasks);
    res
      .status(200)
      .json({ status: "success", message: "Task added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
