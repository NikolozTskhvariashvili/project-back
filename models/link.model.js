const { default: mongoose } = require("mongoose");

const linkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  platform: { type: String, required: true },
  author: { type: String, ref: "user" },
});

module.exports = mongoose.model("link", linkSchema);
