const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const auth = require("../middlewares/auth");

router.post("/mark", auth(["admin", "receptionist"]), async (req, res) => {
  const { date, records } = req.body;

  if (!date || !records || !Array.isArray(records)) {
    return res
      .status(400)
      .json({ message: "date aur records required hain" });
  }

  try {
    for (let rec of records) {
      const { studentId, status } = rec;

      const existing = await Attendance.findOne({
        student: studentId,
        date,
      });

      if (!existing) {
        await Attendance.create({
          student: studentId,
          date,
          status,
        });
      } else {
        existing.status = status;
        await existing.save();
      }
    }

    res.json({ message: "Attendance saved successfully" });
  } catch (error) {
    console.error("Attendance error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
