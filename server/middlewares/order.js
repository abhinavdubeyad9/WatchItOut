const Order = require("../models/order");
const mongoose = require("mongoose");

const getOrders = (req, res) => {
  Order.find()
    .then((result) => {
      return res.status(201).json({ result });
    })
    .catch((err) => {
      return res.json({ error: "error", message: "problem fetching products" });
    });
};

const postOrder = (req, res) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    productId: req.body.productId,
    productName: req.body.productName,
    userId: req.body.userId,
    image: req.body.image,
    userName: req.body.userName,
  });

  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order sucessfull",
        orderDetails: {
          id: result._id,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "error making order",
        error: err,
      });
    });
};

const getOrderByUserId = (req, res) => {
  const userId = req.params.userId;
  Order.find({ userId: userId })
    .then((result) => {
      return res.status(201).json({
        result,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: "error",
        message: "order not found",
      });
    });
};

const validateOrder = (req, res) => {
  const userId = req.user.userId;
  const productId = req.param.productId;

  Order.findOne({ userId: userId, productId: productId })
    .then((result) => {
      return res.status(201).json({
        purchased: true,
        message: "You have purchased this product",
      });
    })
    .catch((err) => {
      return res.status(401).json({
        purchased: false,
        message: "You are not allowed to acess the prouct",
      });
    });
};

module.exports = {
  getOrders,
  postOrder,
  getOrderByUserId,
  validateOrder,
};
