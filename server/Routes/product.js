const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authenticateRole,
} = require("../Controllers/authUser");
const {
  getProduct,
  postProduct,
  getProudctById,
} = require("../middlewares/product");

router.get("/", getProduct);
router.post("/", authenticateToken, authenticateRole("admin"), postProduct);
router.get("/:productId", getProudctById);

module.exports = router;
