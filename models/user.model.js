const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String},
  email: { type: String, required: true, lowerCase: true },
  password: { type: String, required: true , select:false},
  confirmPassword: { type: String},
  links: [{ type: [mongoose.Schema.Types.ObjectId], ref: "link", default: [] }],
});

module.exports = mongoose.model('user', userSchema)