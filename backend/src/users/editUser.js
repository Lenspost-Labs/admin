const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { id, points } = req.body;
  try {
    await prisma.owners.update({
      where: {
        id,
      },
      data: {
        evm_address,
        solana_address,
        lens_handle,
        username,
        points,
      },
    });

    res.status(200).json({ status: "success", message: "User data Updated" });
  } catch (error) {
    console.error("Internal Server Error", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
