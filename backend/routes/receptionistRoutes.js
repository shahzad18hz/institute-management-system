const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  addReceptionist,
  getReceptionists,
  toggleStatus,
  deleteReceptionist,
} = require("../controllers/receptionistController");

// ✅ ADMIN ONLY ROUTES
router.post("/add", auth(["admin"]), addReceptionist);
router.get("/", auth(["admin"]), getReceptionists);
router.patch("/:id/status", auth(["admin"]), toggleStatus);
router.delete("/:id", auth(["admin"]), deleteReceptionist);

module.exports = router;
