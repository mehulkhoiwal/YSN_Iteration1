/**

 * author: Nikita Jaiswal
 */
 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const ObjectId = Schema.ObjectId;
 
 /**
  * userSchema to create a collection named as user
  */
 const postSchema = new Schema({
   _id: String,
   imageUrl: String,
   caption: String,
   likes:Number
 });
 
 module.exports = mongoose.model("posts", postSchema);
 