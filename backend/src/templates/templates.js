const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  // Shows Templates
  try {
    let page = req.query.page;
    page = parseInt(page);

    let limit = req.query.limit || 20;

    if (!page) page = 1;

    let offset = limit * (page - 1);

    let templates = await prisma.template_view.findMany({
      skip: offset,
      take: limit,
    });

    let totalAssets = await prisma.template_view.count({});

    let totalPage = Math.ceil(totalAssets / limit);

    let nextPage = page + 1 > totalPage ? null : page + 1;

    res.status(200).json({
      assets: templates,
      totalPage,
      nextPage,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    await prisma.templates.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        attributes: req.body.attributes,
        collection: req.body.collection,
        collection_id: req.body.collection_id,
        template_id: req.body.template_id,
        template: req.body.template,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
      },
    });
    res.status(200).json({ message: "Template added successfully" });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: error.message });
    
  } 

});

module.exports = router;
