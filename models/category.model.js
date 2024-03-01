/**
 * name,
 * description
 *
 */
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
); //here timestamps : true means it give createdAt and modifiedAt automatically
// versionKey : false to remove -v from mongodb database

module.exports = mongoose.model("Category", categorySchema); //it will be categories
// module.exportsto make it available everywhere
