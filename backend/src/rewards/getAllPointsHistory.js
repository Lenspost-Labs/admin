const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let page = req.query.page || 1;
    page = parseInt(page);
    page = page < 1 ? 1 : page;

    let limit = req.query.limit || 50;
    let offset = (page - 1) * limit;
    const response = await prisma.owners.findMany({
      orderBy: {
        points: "desc",
      },
      select: {
        id: true,
        points: true,
      },
      take: limit,
      skip: offset,
    });

    let totalAssets = await prisma.owners.count();

    let totalPage = Math.ceil(totalAssets / limit);

    res.send({
      data: response,
      totalPage: totalPage,
      nextPage: page + 1 > totalPage ? null : page + 1,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
