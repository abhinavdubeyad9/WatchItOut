const Product = require("../models/product");
const mongoose = require("mongoose");
const Order = require("../models/order");

const getProduct = (req, res) => {
  Product.find()
    .then((result) => {
      let data = [];

      result.map((item) => {
        data.push({
          id: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
        });
      });

      return res.status(201).send(data);
    })
    .catch((err) => {
      return res.json({ error: "error", message: "problem finding product" });
    });
};

const postProduct = (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    link: req.body.link,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created Succesfully",
        result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "error creating prdouct",
      });
    });
};

const getProudctById = (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((result) => {
      return res.status(201).json({
        result,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: "error",
        message: "product not found",
      });
    });
};

//user will only get product Id when he purchased it

// const getProudctById = (req, res) => {
//   const productId = req.params.productId;
//   const userId = req.user.id;
//   Order.findOne({ userId: userId, productId: productId })
//     .then((response) => {
//       Product.findById(response.productId)
//         .then((result) => {
//           return res.status(201).json({
//             result,
//           });
//         })
//         .catch((err) => {
//           return res.status(401).json({
//             error: "error",
//             message: "product not found",
//           });
//         });
//     })
//     .catch((err) => {
//       return res.status(401).send("You have not purchased this item");
//     });
// };

module.exports = {
  getProduct,
  postProduct,
  getProudctById,
};
