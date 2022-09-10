const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    default: [],
    ref: "posts",
  },
});
module.exports = mongoose.model("user", schema);
