const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  addTeacher,
  getTeachers,
  deleteTeacher,
} = require("../controllers/teacherController");

// Admin only
router.post("/add", auth(["admin"]), addTeacher);

// Admin + Receptionist (attendance ke liye)
router.get("/", auth(["admin", "receptionist"]), getTeachers);

// Admin only
router.delete("/:id", auth(["admin"]), deleteTeacher);

module.exports = router;
