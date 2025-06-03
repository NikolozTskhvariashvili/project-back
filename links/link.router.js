const { Router } = require("express");
const linkModel = require("../models/link.model");
const { isValidObjectId } = require("mongoose");
const userModel = require("../models/user.model");

const linksRouter = Router();

linksRouter.get("/", async (req, res) => {
  const links = await linkModel.find().populate('author' , 'email')
  res.json(links);
});

linksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ error: "invalid id" });
  const link = await linkModel.findById(id);
  if (!link) return res.status(400).json({ error: "link not found" });
  res.json(link);
});

linksRouter.post("/", async (req, res) => {
  const { link, platform } = req.body;
  if (!link || !platform)
    return res.status(400).json({ error: "fields are required" });

  const links = await linkModel.create({ link, platform, author: req.userId });
  const user = await userModel.findByIdAndUpdate(req.userId, {$push: {links: links._id}})
  console.log(req.userId)
  res.status(201).json({ message: "links added succsesfully", data: links });
});

linksRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ error: "invalid id" });
  const deletedLink = await linkModel.findByIdAndDelete(id);
  if (!deletedLink) return res.status(400).json({ error: "link not found" });
  res.json({ message: "deleted succsesfully", data: deletedLink });
});

module.exports = linksRouter;
