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


const Attendance = require("../models/Attendance");

exports.getAllStudents = async (req, res) => {
  const { date } = req.query;

  try {
    const students = await Student.find();

    if (!date) {
      return res.json(students);
    }

    const attendance = await Attendance.find({ date });

    const map = {};
    attendance.forEach(a => {
      map[a.student.toString()] = a.status;
    });

    const result = students.map(s => ({
      ...s.toObject(),
      status: map[s._id.toString()] || "A",
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Student fetch error" });
  }
};
