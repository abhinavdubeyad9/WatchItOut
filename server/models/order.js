const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    userName: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
