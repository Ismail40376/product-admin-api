const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    requierd: true,
  },
});

const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
