// controllers/attendanceController.js
const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { rollNo, date } = req.body;

    if (!rollNo || !date) {
      return res.status(400).json({ message: "rollNo aur date required hai" });
    }

    const record = await Attendance.findOne({ rollNo, date });

    if (!record) {
      // first time → Present
      await Attendance.create({
        rollNo,
        date,
        status: "P",
      });
    } else {
      // toggle
      record.status = record.status === "P" ? "A" : "P";
      await record.save();
    }

    res.json({ message: "Attendance updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

