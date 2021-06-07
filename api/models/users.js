/**
 * author: Rajpal Singh Dodiya
 * author: Nikita Jaiswal
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * userSchema to create a collection named as user
 */
const userSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  bio: String,
  mobileNumber: String,
  followers: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Users",
    },
  ],
  blockedUsers: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Users",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.String,
      ref: "posts",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
