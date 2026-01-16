const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getAllFees,
  getFeeByStudent,
  addPayment,
} = require("../controllers/feeController");

router.get("/", auth(["admin"]), getAllFees);          // ✅ ALL
router.get("/:studentId", auth(["admin"]), getFeeByStudent); // ✅ ONE
router.post("/pay", auth(["admin"]), addPayment);      // ✅ PAY

module.exports = router;
