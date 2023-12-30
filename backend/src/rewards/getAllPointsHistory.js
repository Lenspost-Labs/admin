const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await prisma.owners.findMany({
      orderBy: {
        points: "desc", 
      },
      select: {
        id: true,
        points: true,
      },
    });

    res.send({
      message: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
