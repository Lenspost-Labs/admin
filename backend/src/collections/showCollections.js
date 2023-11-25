const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    let collectionAddress = req.params.collection;

    let page = req.query.page || 1;
    page = parseInt(page);
    page = page < 1 ? 1 : page;

    let limit = req.query.limit || 50;
    let offset = (page - 1) * limit;

    let collections = await prisma.collections.findFirst({
      where: {
        address: {
          equals: collectionAddress,
          mode: "insensitive",
        },
      },
    });

    let contents = await prisma.contents.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        collectionId: collections.id,
      },
    });

    let totalAssets = await prisma.contents.count({
      where: {
        collectionId: collections.id,
      },
    });

    let totalPage = Math.ceil(totalAssets / limit);

    res.send({
      assets: contents,
      totalPage: totalPage,
      nextPage: page + 1 > totalPage ? null : page + 1,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
