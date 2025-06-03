const { Router } = require("express");
const linkModel = require("../models/link.model");
const { isValidObjectId } = require("mongoose");

const linksRouter = Router();

linksRouter.get("/", async (req, res) => {
  const links = linkModel.find();
  res.json(links);
});

linksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ error: "invalid id" });
  const link = linkModel.findById(id);
  if (!link) return res.status(400).json({ error: "link not found" });
  res.json(link);
});

linksRouter.post("/", async (req, res) => {
  const { link, platform } = req.body;
  if (!link || !platform)
    return res.status(400).json({ error: "fields are required" });

  const links = linkModel.create({ link, platform });
  res.status(201).json({ message: "links added succsesfully", data: links });
});

linksRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ error: "invalid id" });
  const deletedLink = linkModel.findByIdAndDelete(id);
  if (!deletedLink) return res.status(400).json({ error: "link not found" });
  res.json({ message: "deleted succsesfully", data: deletedLink });
});

module.exports = linksRouter;
