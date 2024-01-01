const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    let collectionAddress = parseInt(req.query.collection);

    // let page = req.query.page || 1;
    // page = parseInt(page);
    // page = page < 1 ? 1 : page;

    // let limit = req.query.limit || 50;
    // let offset = (page - 1) * limit;

    let collections = await prisma.collections.findMany();

    // let contents = await prisma.contents.findMany({
    //   take: limit,
    //   skip: offset,
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    //   where: {
    //     collectionId: collections.id,
    //   },
    // });

    // let totalAssets = await prisma.contents.count({
    //   where: {
    //     collectionId: collections.id,
    //   },
    // });

    // let totalPage = Math.ceil(totalAssets / limit);

    res.send({
      message: collections,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/collection", async (req, res) => {
  try {
    let id = parseInt(req.query.id);
    console.log(req.query);
    
    let page = req.query.page || 1;
    page = parseInt(page);
    page = page < 1 ? 1 : page;

    let limit = req.query.limit || 50;
    let offset = (page - 1) * limit;

    let collection = await prisma.collections.findUnique({
      where: {
        id: id,
      },
    });

    let contents = await prisma.contents.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        collectionId: id,
      },
    });

    let totalAssets = await prisma.contents.count({
      where: {
        collectionId: id,
      },
    });

    let totalPage = Math.ceil(totalAssets / limit);

    if (!collection) {
      return res.status(500).json({ error: "Collection not found" });
    }

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
