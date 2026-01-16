const express = require("express");
const router = express.Router();
const { getAllStudents } = require("../controllers/studentController");
const auth = require("../middlewares/auth");

// Admin & Receptionist dono access kar sakte hain
router.get("/", auth(["admin", "receptionist"]), getAllStudents);

module.exports = router;
