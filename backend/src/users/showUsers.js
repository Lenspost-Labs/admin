const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    const users = await prisma.owners.findMany({
      where: {
        id: req.body.id,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
