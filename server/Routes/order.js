const express = require("express");
const router = express.Router();
const {
  getOrders,
  postOrder,
  getOrderByUserId,
  validateOrder,
} = require("../middlewares/order");
const {
  authenticateRole,
  authenticateToken,
} = require("../Controllers/authUser");

router.get("/", authenticateToken, authenticateRole("admin"), getOrders);
router.post("/", authenticateToken, postOrder);
router.get("/validate/:productId", authenticateToken, validateOrder);
router.get("/:userId", authenticateToken, getOrderByUserId);

module.exports = router;
