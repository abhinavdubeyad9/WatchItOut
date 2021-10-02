const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
