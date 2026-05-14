const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  markAttendance,
  getTeachersAttendance,
  isDateLocked,
} = require("../controllers/teacherAttendanceController");

// Receptionist can mark once; Admin can update
router.post("/", auth(["receptionist", "admin"]), markAttendance);
router.get("/", auth(["receptionist", "admin"]), getTeachersAttendance);
router.get("/date/:date", auth(["receptionist", "admin"]), isDateLocked);

module.exports = router;
