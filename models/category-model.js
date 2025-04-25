const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const Category = mongoose.model("Category", CategorySchema);
module.export = Category;
