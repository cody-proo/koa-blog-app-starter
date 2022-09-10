const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  poster: {
    required: false,
    type: String,
  },
});
module.exports = mongoose.model("post", schema);
